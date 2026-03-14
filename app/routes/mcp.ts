import { config } from "../settings/siteSettings";
import type { MicroCMSQueries } from "microcms-js-sdk";
import { getMicroCMSClient, getPostDetail, getPosts } from "../libs/microcms";
import { StreamableHTTPTransport } from "@hono/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { Hono } from "hono";
import type { Env } from "hono";
import type {
  PopularArticleResponse,
  D1ResultWithPopularPage,
} from "../types/blog";

const limit = 30;

export const getMcpServer = async (c: Context<Env>) => {
  const db = c.env.DB;

  const client = getMicroCMSClient(c);

  const server = new McpServer({
    name: "Qlitre Dialy MCP Server",
    version: "0.0.1",
  });

  server.registerTool(
    "get_posts",
    {
      title: "Get Blog Posts with optional search",
      inputSchema: {
        page: z.number().min(1).default(1),
        q: z.string().optional(),
      },
    },
    async (params: { page: number; q?: string } | undefined) => {
      const page = params?.page || 1;
      const offset = limit * (page - 1);
      const queries: MicroCMSQueries = {
        limit: limit,
        offset: offset,
        fields: config.postListFields,
      };
      if (params?.q) {
        queries.q = params.q;
      }
      const result = await getPosts({ client, queries });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    },
  );

  server.registerTool(
    "get_detail",
    {
      title: "Get Blog Detail",
      inputSchema: {
        id: z.string().min(1),
      },
    },
    async (params: { id: string } | undefined) => {
      if (!params?.id) {
        throw new Error("id is required");
      }
      const result = await getPostDetail({ client, contentId: params.id });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    },
  );

  server.registerTool(
    "get_popular_articles",
    {
      title: "Get 10 popular articles",
      inputSchema: {},
    },
    async () => {
      const result = (await db
        .prepare(`SELECT * FROM popular_page ORDER BY views desc LIMIT 10`)
        .all()) as D1ResultWithPopularPage;

      const results = result.results;
      const popularArticles: PopularArticleResponse[] = [];

      for (const row of results) {
        popularArticles.push({
          id: row.page_id,
          title: row.title,
          url: `${config.siteURL}/post/${row.page_id}`,
          views: row.views,
          description: row.description,
          thumbnail_url: row.thumbnail_url,
          category_name: row.category_name,
          published_at: row.published_at,
        });
      }
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(popularArticles, null, 2),
          },
        ],
      };
    },
  );

  return server;
};

const app = new Hono<Env>();

app.all("/", async (c) => {
  const mcpServer = await getMcpServer(c);
  const transport = new StreamableHTTPTransport();
  await mcpServer.connect(transport);
  return transport.handleRequest(c);
});

app.onError((err, c) => {
  console.log(err.message);

  if (err instanceof HTTPException && err.res) {
    return err.res;
  }

  return c.json(
    {
      jsonrpc: "2.0",
      error: {
        code: -32603,
        message: "Internal server error",
      },
      id: null,
    },
    500,
  );
});

export default app;
