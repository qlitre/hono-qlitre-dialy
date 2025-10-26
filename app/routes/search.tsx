import { createRoute } from "honox/factory";
import { config } from "../settings/siteSettings";
import type { MicroCMSQueries } from "microcms-js-sdk";
import type { Meta } from "../types/meta";
import { ArticleList } from "../components/ArticleList";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { SearchForm } from "../components/SearchForm";
import { getMicroCMSClient, getPosts } from "../libs/microcms";

const limit = 30;

export default createRoute(async (c) => {
  const client = getMicroCMSClient(c);
  const keyword = c.req.query("q") || "";
  const queries: MicroCMSQueries = {
    limit: limit,
    fields: config.postListFields,
    q: keyword,
  };
  const posts = await getPosts({ client, queries });
  const meta: Meta = {
    title: config.siteTitle,
    description: config.siteDescription,
    canonicalUrl: config.siteURL,
    ogpType: "website" as const,
    ogpUrl: config.siteURL,
  };

  return c.render(
    <>
      <div class="container">
        <Breadcrumbs keyword={keyword}></Breadcrumbs>
        <SearchForm initialQuery={keyword} placeholder="記事を検索..." />
        <ArticleList posts={posts.contents}></ArticleList>
      </div>
    </>,
    { meta },
  );
});
