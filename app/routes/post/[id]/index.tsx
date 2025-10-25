import { createRoute } from "honox/factory";
import type { Meta } from "../../../types/meta";
import { config } from "../../../settings/siteSettings";
import { ArticleDetail } from "../../../components/ArticleDetail";
import { getMicroCMSClient, getPostDetail } from "../../../libs/microcms";
import { jstDatetime } from "../../../utils/jstDatetime";

export default createRoute(async (c) => {
  const { id } = c.req.param();
  const client = getMicroCMSClient(c);
  const post = await getPostDetail({ client, contentId: id });
  const contentUrl = config.siteURL + `/post/${id}`;
  const relatedPosts =
    post.relatedPosts && post.relatedPosts.length > 0
      ? post.relatedPosts
      : undefined;

  // ページビューを記録
  const today = jstDatetime(new Date().toISOString(), "YYYY-MM-DD");
  try {
    const tags = post.tag ? JSON.stringify(post.tag) : null;

    // トランザクションで両テーブルを更新
    await c.env.DB.batch([
      c.env.DB.prepare(
        `
        INSERT INTO daily_page_views (page_id, date, views)
        VALUES (?, ?, 1)
        ON CONFLICT(page_id, date) DO UPDATE SET views = views + 1
      `,
      ).bind(id, today),

      c.env.DB.prepare(
        `
        INSERT INTO popular_page (page_id, views, title, description, thumbnail_url, category_id, category_name, tags, published_at, updated_at)
        VALUES (?, 1, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(page_id) DO UPDATE SET
          views = views + 1,
          title = ?,
          description = ?,
          thumbnail_url = ?,
          category_id = ?,
          category_name = ?,
          tags = ?,
          published_at = ?,
          updated_at = ?
      `,
      ).bind(
        id,
        post.title,
        post.description,
        post.thumbnail?.url,
        post.category?.id,
        post.category?.name,
        tags,
        post.publishedAt,
        post.updatedAt,
        post.title,
        post.description,
        post.thumbnail?.url,
        post.category?.id,
        post.category?.name,
        tags,
        post.publishedAt,
        post.updatedAt,
      ),
    ]);
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
