import { Elysia } from "elysia";
import todoRoutes from "./routes/todo-routes";

class App {
  private app: Elysia;
  constructor() {
    this.app = new Elysia();
    this.setupRoutes();
    this.handleUnmatchedRequest();
    this.startServer();
  }
  private setupRoutes() {
    this.app.group("/api/v1", (app) =>
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
    this.app.listen(process.env.PORT || 3000);
    console.log(
      `Todo server is running at ${this.app.server?.hostname}:${this.app.server?.port}`
    );
  }
}

new App();
