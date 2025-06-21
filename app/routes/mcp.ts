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

const limit = 30;

export const getMcpServer = async (c: Context<Env>) => {
  const serviceDomain = c.env.SERVICE_DOMAIN;
  const apiKey = c.env.API_KEY;

  const client = getMicroCMSClient(serviceDomain, apiKey);

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
      const result = await getPosts(client, queries);
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
      const result = await getPostDetail(client, id);
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
