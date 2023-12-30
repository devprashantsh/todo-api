import Database from "../config/db";

class TodoController {
  private todos: ITodo[] = [];

  public async getAllTodos(): Promise<any> {
    const todos = await Database.prisma.todo.findMany();
    return { success: true, data: todos };
  }
  public async getTodos({ jwt, cookie: { auth } }: any): Promise<any> {
    const profile = await jwt.verify(auth);
    const todos = await Database.prisma.todo.findMany({
      where: { userId: profile.id },
    });
    return { success: true, data: todos };
  }

  public async getTodo({
    jwt,
    cookie: { auth },
    params,
  }: any): Promise<{ data: any; success: boolean }> {
    const profile = await jwt.verify(auth);

    const found = await Database.prisma.todo.findUnique({
      where: { id: Number(params.id) },
    });
    if (!found || found.userId !== profile.id) {
      return { success: false, data: null };
    }
    return { success: true, data: found };
  }

  public async createTodo({
    jwt,
    set,
    cookie: { auth },
    body,
  }: any): Promise<any> {
    const profile = await jwt.verify(auth);
    const todo = await Database.prisma.todo.create({
      data: {
        title: body.title,
        completed: false,
        userId: profile.id,
      },
    });
    set.status = 201;
    return { success: true, data: todo };
  }

  public async deleteTodo({
    jwt,
    params,
    cookie: { auth },
    body,
  }: any): Promise<{ success: boolean; message: string }> {
    const profile = await jwt.verify(auth);

    const found = await Database.prisma.todo.findUnique({
      where: { id: Number(params.id), userId: profile.id },
    });
    if (!found) {
      return { success: false, message: "Not Found" };
    }
    await Database.prisma.todo.delete({
      where: { id: Number(params.id), userId: profile.id },
    });
    return { success: true, message: "Deleted Successfully" };
  }

  public async updateTodo({
    jwt,
    params,
    cookie: { auth },
    body,
  }: any): Promise<{ success: boolean; message?: string }> {
    const profile = await jwt.verify(auth);
    const found = await Database.prisma.todo.findUnique({
      where: { id: Number(params.id), userId: profile.id },
    });
    if (!found) {
      return { success: false, message: "Not Found" };
    }
    return { success: true, message: "Updated Successfully" };
  }
}

export default TodoController;
