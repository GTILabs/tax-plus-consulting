import { getArticle, getArticles } from "@/modules/content/data";

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export async function GET(_req: Request, ctx: RouteContext<"/api/articles/[slug]">) {
  const { slug } = await ctx.params;
  const article = await getArticle(slug);
  if (!article) return Response.json({ error: "Article not found" }, { status: 404 });
  return Response.json({ data: article });
}
