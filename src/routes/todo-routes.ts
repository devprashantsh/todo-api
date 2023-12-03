import { Elysia } from "elysia";
import TodoController from "../controllers/todo-controller";
import authorize from "../middlewares/auth-handler";

class TodoRoutes {
  private routes: Elysia;
  private todoController: TodoController;
  constructor() {
    this.routes = new Elysia({ prefix: "/todo" } as any);
    this.todoController = new TodoController()
    this.setupRoutes();
  }
  private setupRoutes() {
    this.routes.get("/:id", (options) => this.todoController.getTodo(options), {
      beforeHandle: [authorize]
    });
    this.routes.post("/", (options) => this.todoController.createTodo(options), {
      beforeHandle: [authorize]
    });

    this.routes.delete("/:id", ({ params }) => this.todoController.deleteTodo(params.id));
    this.routes.put("/:id", ({ params, body }) => this.todoController.updateTodo(params.id, body));
    this.routes.get("/", ({ }) => this.todoController.getTodos());
  }

  public getRoutes() {
    this.setupRoutes();
    return this.routes;
  }
}
export default new TodoRoutes().getRoutes();
