import { articles, getArticle } from "@/modules/content/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function GET(_req: Request, ctx: RouteContext<"/api/articles/[slug]">) {
  const { slug } = await ctx.params;
  const article = getArticle(slug);
  if (!article) return Response.json({ error: "Article not found" }, { status: 404 });
  return Response.json({ data: article });
}
