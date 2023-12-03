import { Elysia, ElysiaConfig } from "elysia";
import todoRoutes from "./routes/todo-routes";
import Database from "./config/db";

class App {
  private app: Elysia;
  // private database: Database;
  constructor() {
    this.app = new Elysia({ prefix: "/api" });
    // this.database = new Database();
    this.setupRoutes();
    this.handleUnmatchedRequest();
    this.startServer();
  }
  private setupRoutes() {
    this.app.group("/v2", (app) =>
      app
        .get("/", () => ({ message: "Welcome to Todo app" }))
        .get("/test", () => ({ message: "Welcome to Todo test" }))
        .use(todoRoutes)
    );
  }
  private handleUnmatchedRequest() {
    this.app.get("/*", () => ({ message: "Unmatched request" }));
  }
  private startServer() {
    this.app
      .listen(process.env.PORT || 4000)
      .onStart(async () => {})
      .onError(async (e) => {
        console.error(e);
        await Database.disconnect();
        process.exit(1);
      });
    console.log(
      `Todo server is running at ${this.app.server?.hostname}:${this.app.server?.port}`
    );
  }
}

new App();
