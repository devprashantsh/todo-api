import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cookie } from "@elysiajs/cookie";
import todoRoutes from "./routes/todo-routes";
import Database from "./config/db";
import authRoutes from "./routes/auth-routes";
import errorHandler from "./middlewares/error-handler";

class App {
  private app: Elysia;
  
  constructor() {
    this.app = new Elysia({ prefix: "/api" } as any);
    this.setupMiddlewares()
    this.setupRoutes();
    this.handleUnmatchedRequest();
    this.startServer();
  }
  private setupRoutes() {
    this.app.group("/v2", (app) =>
      app
        .get("/", ({}) => ({ message: "Welcome to Todo app" }))
        .use(todoRoutes)
        .use(authRoutes)
    );
  }
  private setupMiddlewares() {
    this.app.onError(errorHandler);
    this.setupJWT();
  }
  
  private setupJWT() {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error(
        "JWT secret is not defined in the environment variables."
      );
    }
    this.app.use(
      jwt({
        name: "jwt",
        secret: jwtSecret,
      }) as any
    );
    this.app.use(cookie() as any);
  }

  private handleUnmatchedRequest() {
    this.app.get("/*", ({}) => ({ message: "Unmatched request" }));
  }
  private startServer() {
    this.app
      .onStart(async () => {
        console.log(
          `Todo server is running at ${this.app.server?.hostname}:${this.app.server?.port}`
        );
      })

      .listen(process.env.PORT || 4000);
  }
}

new App();
