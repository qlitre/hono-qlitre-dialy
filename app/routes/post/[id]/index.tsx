import { createRoute } from "honox/factory";
import type { Meta } from "../../../types/meta";
import { config } from "../../../settings/siteSettings";
import { ArticleDetail } from "../../../components/ArticleDetail";
import { getMicroCMSClient, getPostDetail } from "../../../libs/microcms";
import { jstDatetime } from "../../../utils/jstDatetime";

export default createRoute(async (c) => {
  const { id } = c.req.param();
  const client = getMicroCMSClient({ serviceDomain: c.env.SERVICE_DOMAIN, apiKey: c.env.API_KEY });
  const post = await getPostDetail({ client, contentId: id });
  const contentUrl = config.siteURL + `/post/${id}`;
  const relatedPosts =
    post.relatedPosts && post.relatedPosts.length > 0
      ? post.relatedPosts
      : undefined;

  // ページビューを記録
  const today = jstDatetime(new Date().toISOString(), "YYYY-MM-DD");
  try {
    await c.env.DB.prepare(`
      INSERT INTO daily_page_views (page_id, date, views)
      VALUES (?, ?, 1)
      ON CONFLICT(page_id, date) DO UPDATE SET views = views + 1
    `).bind(id, today).run();
  } catch (error) {
    console.error("Failed to record page view:", error);
  }

  const meta: Meta = {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    canonicalUrl: contentUrl,
    ogpType: "article" as const,
    ogpImage: post.thumbnail?.url,
    ogpUrl: contentUrl,
  };
  return c.render(
    <div class="container">
      <ArticleDetail post={post} relatedPosts={relatedPosts} />
    </div>,
    { meta },
  );
});
