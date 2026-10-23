import { services } from "@/modules/content/services";

export function GET() {
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
