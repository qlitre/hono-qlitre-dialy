import build from "@hono/vite-build/cloudflare-pages";
import adapter from "@hono/vite-dev-server/cloudflare";
import honox from "honox/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [honox({ devServer: { adapter } }), build()],
  ssr: {
    external: [
      "microcms-js-sdk",
      "dayjs",
      "microcms-rich-editor-handler",
      "shiki",
    ],
  },
});
