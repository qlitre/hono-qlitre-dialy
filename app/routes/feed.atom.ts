import { createRoute } from "honox/factory";
import { config } from "../settings/siteSettings";
import type { MicroCMSListResponse } from "microcms-js-sdk";
import type { Post } from "../types/blog";
import { MicroCMSClient } from "../libs/microcmsClient";
import { jstDatetime } from "../utils/jstDatetime";

export default createRoute(async (c) => {
  const client = new MicroCMSClient(c.env.SERVICE_DOMAIN, c.env.API_KEY);
  const limit = 50;
  const r = await client.getListResponse<MicroCMSListResponse<Post>>("post", {
    limit: limit,
    fields: "id,title,updatedAt,createdAt",
  });
  const baseUrl = config.siteURL;
  const feedItems: string[] = [];
  for (const post of r.contents) {
    feedItems.push(` <entry>
      <title>${post.title}</title>
      <link href="${baseUrl}/post/${post.id}" />
      <id>${baseUrl}/post/${post.id}</id>
      <updated>${jstDatetime(post.updatedAt)}</updated>
      <published>${jstDatetime(post.createdAt)}</published>
    </entry>`);
  }
  const atomFeed = `<?xml version="1.0" encoding="UTF-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>${config.siteTitle}</title>
    <link href="${baseUrl}/feed.atom" rel="self"/>
    <link href="${baseUrl}/"/>
    <id>${baseUrl}/</id>
    <updated>${jstDatetime(new Date().toISOString())}</updated>
    ${feedItems.join("")}
  </feed>`;
  return c.text(atomFeed,200,{"Content-Type":"atom+xml"})
}); 
