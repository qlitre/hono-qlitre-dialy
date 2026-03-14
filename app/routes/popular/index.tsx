import { css } from "hono/css";
import { createRoute } from "honox/factory";
import { LinkToHome } from "../../components/LinkToHome";
import type { Meta } from "../../types/meta";
import { config } from "../../settings/siteSettings";
import type { D1ResultWithPopularPage } from "../../types/blog";
import { PopularArticleCard } from "../../components/PopularArticleCard";

export default createRoute(async (c) => {
  const url = new URL(c.req.url);
  const canonicalUrl = `${url.protocol}//${url.host}/popular`;

  const meta: Meta = {
    title: `人気記事 - ${config.siteTitle}`,
    description: "訪問記録ランキング",
    keywords: "人気記事,ランキング",
    canonicalUrl: canonicalUrl,
    ogpType: "website" as const,
    ogpUrl: canonicalUrl,
  };

  const db = c.env.DB;
  const result = (await db
    .prepare(`SELECT * FROM popular_page ORDER BY views desc LIMIT 30`)
    .all()) as D1ResultWithPopularPage;

  const results = result.results;

  const headingClass = css`
    font-size: var(--font-size-xl);
    font-weight: bold;
  `;

  const emptyClass = css`
    color: var(--c-gray-500);
  `;

  const listClass = css`
    background-color: var(--c-white);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
  `;

  return c.render(
    <div class="container">
      <h2 class={headingClass}>人気記事</h2>

      {results.length === 0 ? (
        <p class={emptyClass}>まだデータがありません</p>
      ) : (
        <div class={listClass}>
          {results.map((post, index) => (
            <PopularArticleCard post={post} rank={index + 1} />
          ))}
        </div>
      )}
      <LinkToHome />
    </div>,
    { meta },
  );
});
