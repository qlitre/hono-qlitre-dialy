import { showRoutes } from "hono/dev";
import { createApp } from "honox/server";
import mcpApp from "./routes/mcp";

const app = createApp();

app.route("/mcp", mcpApp);

showRoutes(app);

export default app;
