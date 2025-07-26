import { createClient, type MicroCMSQueries } from "microcms-js-sdk";
import type { Post, Category, Tag } from "../types/blog";

export const getMicroCMSClient = ({ serviceDomain, apiKey }: { serviceDomain: string, apiKey: string }) => {
  return createClient({
    serviceDomain,
    apiKey,
  });
};

export const getPosts = async ({ client, queries }: {
  client: ReturnType<typeof createClient>,
  queries?: MicroCMSQueries,
}) => {
  return await client.getList<Post>({
    endpoint: "post",
    queries,
  });
};

export const getCategories = async ({ client }: {
  client: ReturnType<typeof createClient>,
}) => {
  return await client.getList<Category>({
    endpoint: "category",
  });
};

export const getPostDetail = async ({ client, contentId, queries }: {
  client: ReturnType<typeof createClient>,
  contentId: string,
  queries?: MicroCMSQueries,
}) => {
  return await client.getListDetail<Post>({
    endpoint: "post",
    contentId,
    queries,
  });
};

export const getTagDetail = async ({ client, contentId, queries }: {
  client: ReturnType<typeof createClient>,
  contentId: string,
  queries?: MicroCMSQueries,
}) => {
  return await client.getListDetail<Tag>({
    endpoint: "tag",
    contentId,
    queries,
  });
};

export const getCategoryDetail = async ({ client, contentId, queries }: {
  client: ReturnType<typeof createClient>,
  contentId: string,
  queries?: MicroCMSQueries,
}) => {
  return await client.getListDetail<Category>({
    endpoint: "category",
    contentId,
    queries,
  });
};
