import { Elysia } from "elysia";
import TodoController from "../controllers/todo-controller";

class TodoRoutes {
  private routes: Elysia;
  private todoController: TodoController;
  constructor() {
    this.routes = new Elysia({ prefix: "/todo" });
    this.todoController = new TodoController()
    this.setupRoutes();
  }
  private setupRoutes() {
    this.routes.get("/:id", ({params,}) => this.todoController.getTodo(params.id));
    this.routes.delete("/:id", ({params}) => this.todoController.deleteTodo(params.id));
    this.routes.put("/:id", ({params, body}) => this.todoController.updateTodo(params.id, body));
    this.routes.post("/create", ({ body}) => this.todoController.createTodo(body as ITodo));
    this.routes.get("/list", () => this.todoController.getTodos());
  }
  
  public getRoutes() {
    this.setupRoutes();
    return this.routes;
  }
}
export default new TodoRoutes().getRoutes();
