import { articles } from "@/modules/content/articles";

export function GET() {
  return Response.json({
    data: articles.map(({ slug, category, title, excerpt, publishedAt, readingMinutes }) => ({
      slug,
      category,
      title,
      excerpt,
      publishedAt,
      readingMinutes,
    })),
  });
}
