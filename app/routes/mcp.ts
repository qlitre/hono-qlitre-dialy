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

// popular_page テーブルの型定義
interface PopularPage {
  page_id: string;
  views: number;
  title: string;
  description?: string;
  thumbnail_url?: string;
  category_id?: string;
  category_name?: string;
  tags?: string;
  published_at?: string;
  updated_at?: string;
  is_active: boolean;
}

// D1Result型を拡張してPopularPageを指定
interface D1ResultWithPopularPage {
  results: PopularPage[];
  success: boolean;
  meta: {
    served_by: string;
    duration: number;
    changes: number;
    last_row_id: number;
    changed_db: boolean;
    size_after: number;
    rows_read: number;
    rows_written: number;
  };
}

// API用のレスポンス型
interface PopularArticleResponse {
  id: string;
  title: string;
  url: string;
  views: number;
  description?: string;
  thumbnail_url?: string;
  category_name?: string;
  published_at?: string;
}

const limit = 30;

export const getMcpServer = async (c: Context<Env>) => {
  const db = c.env.DB;

  const client = getMicroCMSClient(c);

  const server = new McpServer({
    name: "Qlitre Dialy MCP Server",
    version: "0.0.1",
  });

  server.tool(
    "get_posts",
    "Get Blog Posts with optional search",
    {
      page: z.number().min(1).default(1),
      q: z.string().optional(),
    },
    async ({ page, q }) => {
      const offset = limit * (page - 1);
      const queries: MicroCMSQueries = {
        limit: limit,
        offset: offset,
        fields: config.postListFields,
        ...(q && { q: q }),
      };
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
  server.tool(
    "get_detail",
    "Get Blog Detail",
    {
      id: z.string().min(1),
    },
    async ({ id }) => {
      const result = await getPostDetail({ client, contentId: id });
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

  server.tool(
    "get_popular_articles",
    "get 10 popular articles",
    {},
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
