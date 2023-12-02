import { generateUniqueId } from "../utils/intex";

class TodoController {
  private todos: ITodo[] = [];

  public getTodos(): { data: ITodo[]; success: boolean } {
    return { success: true, data: this.todos };
  }
  public getTodo(id: string): { data: any; success: boolean } {
    const found = this.todos.find((t) => t.id === id);
    if (!found) {
      return { success: false, data: null };
    }
    return { success: true, data: found };
  }
  public createTodo(todo: ITodo): { data: ITodo[]; success: boolean } {
    const newId = generateUniqueId();
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
