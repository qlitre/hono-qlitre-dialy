import { createRoute } from "honox/factory";
import { BLOG_PER_PAGE, config } from "../../../../settings/siteSettings";
import { HomeContent } from "../../../../components/HomeContent";
import type { MicroCMSQueries, MicroCMSListResponse } from "microcms-js-sdk";
import type { Meta } from "../../../../types/meta";
import {
  getMicroCMSClient,
  getPosts,
  getCategories,
  getCategoryDetail,
} from "../../../../libs/microcms";

const limit = BLOG_PER_PAGE;

export default createRoute(async (c) => {
  const categoryId = c.req.param("categoryId");
  const pageId = c.req.param("pageId");
  const offset = (Number(pageId) - 1) * limit;
  const client = getMicroCMSClient({ serviceDomain: c.env.SERVICE_DOMAIN, apiKey: c.env.API_KEY });
  const queries: MicroCMSQueries = {
    filters: `category[equals]${categoryId}`,
    limit: limit,
    fields: config.postListFields,
    offset: offset,
    orders: "-publishedAt",
  };
  const posts = await getPosts({ client, queries });
  const categories = await getCategories({ client });
  const categoryDetail = await getCategoryDetail({ client, contentId: categoryId });
  const totalCount = posts.totalCount;
  const currentPage = Number(pageId);
  const paginationMaterial = {
    totalCount: totalCount,
    currentPage: currentPage,
    categoryId: categoryId,
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
      category={categoryDetail}
    />,
    { meta },
  );
});
