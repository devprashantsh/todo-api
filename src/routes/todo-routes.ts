import { Elysia } from "elysia";
import TodoController from "../controllers/todo-controller";
import authorize from "../middlewares/auth-handler";

class TodoRoutes {
  private routes: Elysia;
  private todoController: TodoController;
  constructor() {
    this.routes = new Elysia({ prefix: "/todo" } as any);
    this.todoController = new TodoController();
    this.setupRoutes();
  }
  private setupRoutes() {
    this.routes.get("/:id", (options) => this.todoController.getTodo(options), {
      beforeHandle: [authorize],
    });
    this.routes.post(
      "/",
      (options) => this.todoController.createTodo(options),
      {
        beforeHandle: [authorize],
      }
    );
    this.routes.delete(
      "/:id",
      (options) => this.todoController.deleteTodo(options),
      { beforeHandle: [authorize] }
    );
    this.routes.put(
      "/:id",
      (options) => this.todoController.updateTodo(options),
      { beforeHandle: [authorize] }
    );
    this.routes.get("/", (options) => this.todoController.getTodos(options), {
      beforeHandle: [authorize],
    });
    this.routes.get("/list-all", ({}) => this.todoController.getAllTodos(), {
      beforeHandle: [authorize],
    });
  }

  public getRoutes() {
    this.setupRoutes();
    return this.routes;
  }
}
export default new TodoRoutes().getRoutes();
