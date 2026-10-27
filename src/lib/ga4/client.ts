import "server-only";

import { createSign } from "node:crypto";

/*
 * Minimal Google Analytics Data API client: a service account signs a JWT, trades it
 * for an access token, and calls runReport / runRealtimeReport over REST.
 * Env: GA4_PROPERTY_ID (numeric) and GA4_CREDENTIALS (the service account JSON key).
 */

type Credentials = { client_email: string; private_key: string };

export function ga4Config() {
  const propertyId = process.env.GA4_PROPERTY_ID?.replace(/^properties\//, "").trim();
  const raw = process.env.GA4_CREDENTIALS?.trim();
  if (!propertyId || !raw) return null;
  try {
    // Accept the JSON as is or base64-encoded (easier to paste into some env UIs).
    const json = raw.startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
    const creds = JSON.parse(json) as Credentials;
    return creds.client_email && creds.private_key ? { propertyId, creds } : null;
  } catch {
    return null;
  }
}

let token: { value: string; expires: number } | undefined;

async function accessToken(creds: Credentials) {
  if (token && token.expires > Date.now() + 60_000) return token.value;
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: creds.client_email,
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(creds.private_key, "base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GA4 auth failed (${res.status}): ${await res.text()}`);
  const json = (await res.json()) as { access_token: string; expires_in: number };
  token = { value: json.access_token, expires: Date.now() + json.expires_in * 1000 };
  return token.value;
}

export type ReportRow = { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] };
export type Report = { rows?: ReportRow[]; rowCount?: number };

export async function ga4Request(method: "runReport" | "runRealtimeReport", body: object): Promise<Report> {
  const config = ga4Config();
  if (!config) throw new Error("GA4 is not configured");
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${config.propertyId}:${method}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${await accessToken(config.creds)}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GA4 ${method} failed (${res.status}): ${await res.text()}`);
  return (await res.json()) as Report;
}
