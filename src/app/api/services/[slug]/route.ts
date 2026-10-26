import { getService, getServices } from "@/modules/content/data";

export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export async function GET(_req: Request, ctx: RouteContext<"/api/services/[slug]">) {
  const { slug } = await ctx.params;
  const service = await getService(slug);
  if (!service) return Response.json({ error: "Service not found" }, { status: 404 });
  return Response.json({ data: service });
}
