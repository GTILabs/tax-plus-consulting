import { services } from "@/modules/content/services";

export function GET() {
  return Response.json({
    data: services.map(({ slug, name, subtitle, intro, hub }) => ({
      slug,
      name,
      subtitle,
      intro,
      tags: hub.tags,
    })),
  });
}
