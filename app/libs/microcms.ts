import { createClient, type MicroCMSQueries } from "microcms-js-sdk";
import type { Post, Category, Tag } from "../types/blog";

export const getMicroCMSClient = (serviceDomain: string, apiKey: string) => {
  return createClient({
    serviceDomain,
    apiKey,
  });
};

export const getPosts = async (
  client: ReturnType<typeof createClient>,
  queries?: MicroCMSQueries,
) => {
  return await client.getList<Post>({
    endpoint: "post",
    queries,
  });
};

export const getCategories = async (
  client: ReturnType<typeof createClient>,
) => {
  return await client.getList<Category>({
    endpoint: "category",
  });
};

export const getPostDetail = async (
  client: ReturnType<typeof createClient>,
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  return await client.getListDetail<Post>({
    endpoint: "post",
    contentId: contentId,
    queries: queries,
  });
};

export const getTagDetail = async (
  client: ReturnType<typeof createClient>,
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  return await client.getListDetail<Tag>({
    endpoint: "tag",
    contentId: contentId,
    queries: queries,
  });
};

export const getCategoryDetail = async (
  client: ReturnType<typeof createClient>,
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  return await client.getListDetail<Category>({
    endpoint: "category",
    contentId: contentId,
    queries: queries,
  });
};
