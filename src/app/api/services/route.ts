import { getServices } from "@/modules/content/data";

export async function GET() {
  const services = await getServices();
  return Response.json({
    data: services.map(({ slug, name, subtitle, intro, scope }) => ({
      slug,
      name,
      subtitle,
      intro,
      tags: scope.map((s) => s.title),
    })),
  });
}
