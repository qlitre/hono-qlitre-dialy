import build from "@hono/vite-build/cloudflare-workers";
import adapter from "@hono/vite-dev-server/cloudflare";
import honox from "honox/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    honox({ devServer: { adapter }, client: { input: ["./public/static/css/style.css"] } }),
    build(),
  ],
  build: {
    rollupOptions: {
      external: ["cloudflare:workers"]
    }
  },
  ssr: {
    external: [
      "microcms-js-sdk",
      "dayjs",
      "microcms-rich-editor-handler", 
      "shiki",
      "@modelcontextprotocol/sdk",
      "@hono/mcp",
      "cloudflare:workers",
    ],
  },
});
