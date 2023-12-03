import Database from "../config/db";
import { generateUniqueId } from "../utils/intex";

class TodoController {
  private todos: ITodo[] = [];
  

  public async getTodos(): Promise<any> {
    const todos = await Database.prisma.todo.findMany()
    return { success: true, data: todos };
  }
  public getTodo(id: string): { data: any; success: boolean } {
    const found = this.todos.find((t) => t.id === id);
    if (!found) {
      return { success: false, data: null };
    }
    return { success: true, data: found };
  }
  public async createTodo(todo: ITodo): Promise<any> {
    const newId = generateUniqueId();
    await Database.prisma.todo.create({
      data: {
        title: "fisrt",
        completed: false,
        userId: "asdfasdf",
      },
    });
    this.todos.push({ ...todo, id: newId });
    return { success: true, data: this.todos };
  }
  public deleteTodo(id: string): { success: boolean; message: string } {
    const found = this.todos.find((t) => t.id === id);
    if (!found) {
      return { success: false, message: "Not Found" };
    }
    this.todos = this.todos.filter((t) => t.id !== id);
    return { success: true, message: "Deleted Successfully" };
  }
  public updateTodo(
    id: string,
    todo: any
  ): { success: boolean; message?: string } {
    const found = this.todos.find((t) => t.id === id);
    if (!found) {
      return { success: false, message: "Not Found" };
    }
    const index = this.todos.indexOf(found);
    this.todos[index] = { ...found, ...todo };
    return { success: true, message: "Updated Successfully" };
  }
}

[{ id: "asdfadf", title: "new task 1", description: "adfadfjhdfkjadhf" }];

export default TodoController;
