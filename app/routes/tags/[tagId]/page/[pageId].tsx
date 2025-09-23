import { createRoute } from "honox/factory";
import { BLOG_PER_PAGE, config } from "../../../../settings/siteSettings";
import { HomeContent } from "../../../../components/HomeContent";
import type { MicroCMSQueries } from "microcms-js-sdk";
import type { Meta } from "../../../../types/meta";
import {
  getMicroCMSClient,
  getPosts,
  getCategories,
  getTagDetail,
} from "../../../../libs/microcms";

const limit = BLOG_PER_PAGE;

export default createRoute(async (c) => {
  const tagId = c.req.param("tagId");
  const pageId = c.req.param("pageId");
  const offset = (Number(pageId) - 1) * limit;
  const client = getMicroCMSClient({
    serviceDomain: c.env.SERVICE_DOMAIN,
    apiKey: c.env.API_KEY,
  });
  const queries: MicroCMSQueries = {
    filters: `tag[contains]${tagId}`,
    limit: limit,
    fields: config.postListFields,
    offset: offset,
    orders: "-publishedAt",
  };

  const posts = await getPosts({ client, queries });
  const categories = await getCategories({ client });
  const tagDetail = await getTagDetail({ client, contentId: tagId });
  const totalCount = posts.totalCount;
  const currentPage = Number(pageId);
  const paginationMaterial = {
    totalCount: totalCount,
    currentPage: currentPage,
    tagId: tagId,
  };

  const meta: Meta = {
    title: config.siteTitle,
    description: config.siteDescription,
    canonicalUrl: config.siteURL,
    ogpType: "website" as const,
    ogpUrl: config.siteURL,
  };
  return c.render(
    <HomeContent
      posts={posts.contents}
      categories={categories.contents}
      paginationMaterial={paginationMaterial}
      tag={tagDetail}
    />,
    { meta },
  );
});
