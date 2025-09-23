import { createRoute } from "honox/factory";
import { DetailContent } from "../../../../components/DetailContent";
import { getMicroCMSClient, getPostDetail } from "../../../../libs/microcms";

export default createRoute(async (c) => {
  const { id } = c.req.param();
  const draftKey = c.req.query("draftKey");
  const queries = { draftKey: draftKey };
  const client = getMicroCMSClient({
    serviceDomain: c.env.SERVICE_DOMAIN,
    apiKey: c.env.API_KEY,
  });
  const post = await getPostDetail({ client, contentId: id, queries });

  return c.render(<DetailContent post={post} />);
});
