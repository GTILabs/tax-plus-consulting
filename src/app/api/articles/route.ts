import { getArticles } from "@/modules/content/data";

export async function GET() {
  const articles = await getArticles();
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
