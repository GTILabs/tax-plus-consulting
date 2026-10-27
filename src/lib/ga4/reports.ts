import "server-only";

import { cacheLife } from "next/cache";
import { ga4Request, type Report } from "./client";

export const RANGES = { 7: "7 hari", 28: "28 hari", 90: "90 hari" } as const;
export type RangeDays = keyof typeof RANGES;

const rows = (r: Report) =>
  (r.rows ?? []).map((row) => ({
    dims: (row.dimensionValues ?? []).map((d) => d.value),
    values: (row.metricValues ?? []).map((m) => Number(m.value)),
  }));

const KPI_METRICS = ["activeUsers", "newUsers", "sessions", "screenPageViews", "averageSessionDuration", "engagementRate"] as const;
export type Kpi = (typeof KPI_METRICS)[number];

/** A breakdown: label and value, largest first. */
export type Breakdown = { label: string; value: number; sub?: string }[];

/** Every report for the range, cached for a few minutes to stay within the API quota. */
export async function getOverview(days: RangeDays) {
  "use cache";
  cacheLife("minutes");
  const current = { startDate: `${days - 1}daysAgo`, endDate: "today", name: "current" };
  const previous = { startDate: `${days * 2 - 1}daysAgo`, endDate: `${days}daysAgo`, name: "previous" };
  const top = (dimension: string, metric: string, limit: number, extra: object = {}) =>
    ga4Request("runReport", {
      dateRanges: [current],
      dimensions: [{ name: dimension }],
      metrics: [{ name: metric }],
      orderBys: [{ metric: { metricName: metric }, desc: true }],
      limit,
      ...extra,
    });

  const [kpis, trend, pages, channels, sources, devices, cities, events] = await Promise.all([
    ga4Request("runReport", { dateRanges: [current, previous], metrics: KPI_METRICS.map((name) => ({ name })) }),
    ga4Request("runReport", {
      dateRanges: [current],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
      keepEmptyRows: true,
    }),
    ga4Request("runReport", {
      dateRanges: [current],
      dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
      metrics: [{ name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 10,
    }),
    top("sessionDefaultChannelGroup", "sessions", 8),
    top("sessionSource", "sessions", 8),
    top("deviceCategory", "activeUsers", 4),
    top("city", "activeUsers", 8),
    ga4Request("runReport", {
      dateRanges: [current, previous],
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: { filter: { fieldName: "eventName", inListFilter: { values: ["whatsapp_click", "generate_lead"] } } },
    }),
  ]);

  // With two date ranges GA adds a "dateRange" dimension to each row.
  const kpiRows = rows(kpis);
  const pick = (name: string) => kpiRows.find((r) => r.dims.includes(name))?.values ?? [];
  const cur = pick("current");
  const prev = pick("previous");
  const kpi = Object.fromEntries(KPI_METRICS.map((m, i) => [m, { value: cur[i] ?? 0, previous: prev[i] ?? 0 }])) as Record<Kpi, { value: number; previous: number }>;

  const eventRows = rows(events);
  const eventValue = (name: string, range: string) => eventRows.find((r) => r.dims[0] === name && r.dims.includes(range))?.values[0] ?? 0;
  const conversions = {
    whatsapp: { value: eventValue("whatsapp_click", "current"), previous: eventValue("whatsapp_click", "previous") },
    leads: { value: eventValue("generate_lead", "current"), previous: eventValue("generate_lead", "previous") },
  };

  const asBreakdown = (r: Report): Breakdown => rows(r).map((x) => ({ label: x.dims[0] || "(tidak diketahui)", value: x.values[0] }));

  return {
    kpi,
    conversions,
    trend: rows(trend).map((x) => ({ date: x.dims[0], users: x.values[0], views: x.values[1] })),
    pages: rows(pages).map((x) => ({ label: x.dims[0], sub: x.dims[1], value: x.values[0] })),
    channels: asBreakdown(channels),
    sources: asBreakdown(sources),
    devices: asBreakdown(devices),
    cities: asBreakdown(cities),
  };
}

export type Overview = Awaited<ReturnType<typeof getOverview>>;

/** Users active in the last 30 minutes and the pages they are on. Not cached. */
export async function getRealtime() {
  const [total, pages] = await Promise.all([
    ga4Request("runRealtimeReport", { metrics: [{ name: "activeUsers" }] }),
    ga4Request("runRealtimeReport", {
      dimensions: [{ name: "unifiedScreenName" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      limit: 5,
    }),
  ]);
  return {
    activeUsers: Number(total.rows?.[0]?.metricValues?.[0]?.value ?? 0),
    pages: rows(pages).map((x) => ({ label: x.dims[0], value: x.values[0] })),
  };
}
