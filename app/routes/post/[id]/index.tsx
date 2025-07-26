import { createRoute } from "honox/factory";
import type { Meta } from "../../../types/meta";
import { config } from "../../../settings/siteSettings";
import { DetailContent } from "../../../components/DetailContent";
import { getMicroCMSClient, getPostDetail } from "../../../libs/microcms";

export default createRoute(async (c) => {
  const { id } = c.req.param();
  const client = getMicroCMSClient(c.env.SERVICE_DOMAIN, c.env.API_KEY);
  const post = await getPostDetail(client, id);
  const contentUrl = config.siteURL + `/post/${id}`;
  const relatedPosts = post.relatedPosts && post.relatedPosts.length > 0 ? post.relatedPosts : undefined;
  
  const meta: Meta = {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    canonicalUrl: contentUrl,
    ogpType: "article" as const,
    ogpImage: post.thumbnail?.url,
    ogpUrl: contentUrl,
  };
  return c.render(<DetailContent post={post} relatedPosts={relatedPosts} />, { meta });
});
