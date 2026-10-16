import { articles } from "@/modules/content/articles";

export function GET() {
  return Response.json({
    data: articles.map(({ slug, category, title, excerpt, readingMinutes, featured }) => ({
      slug,
      category,
      title,
      excerpt,
      readingMinutes,
      featured: Boolean(featured),
    })),
  });
}
