import { createClient, type MicroCMSQueries } from "microcms-js-sdk";
import type { Post, Category, Tag } from "../types/blog";
import type { Context } from "hono";

type MicroCMSClient = ReturnType<typeof createClient>;

type ClientConfig = {
  serviceDomain: string;
  apiKey: string;
};

type ClientWithQueries = {
  client: MicroCMSClient;
  queries?: MicroCMSQueries;
};

type ClientWithContentId = {
  client: MicroCMSClient;
  contentId: string;
  queries?: MicroCMSQueries;
};

export const getMicroCMSClient = (c: Context) => {
  return createClient({
    serviceDomain: c.env.SERVICE_DOMAIN,
    apiKey: c.env.API_KEY,
  });
};

export const getPosts = async ({ client, queries }: ClientWithQueries) => {
  return await client.getList<Post>({
    endpoint: "post",
    queries,
  });
};

export const getAllPosts = async ({ client, queries }: ClientWithQueries) => {
  return await client.getAllContents<Post>({
    endpoint: "post",
    queries,
  });
};

export const getCategories = async ({ client }: { client: MicroCMSClient }) => {
  return await client.getList<Category>({
    endpoint: "category",
  });
};

export const getPostDetail = async ({
  client,
  contentId,
  queries,
}: ClientWithContentId) => {
  return await client.getListDetail<Post>({
    endpoint: "post",
    contentId,
    queries,
  });
};

export const getTagDetail = async ({
  client,
  contentId,
  queries,
}: ClientWithContentId) => {
  return await client.getListDetail<Tag>({
    endpoint: "tag",
    contentId,
    queries,
  });
};

export const getCategoryDetail = async ({
  client,
  contentId,
  queries,
}: ClientWithContentId) => {
  return await client.getListDetail<Category>({
    endpoint: "category",
    contentId,
    queries,
  });
};
