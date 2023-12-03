interface ITodo {
    id?: string;
    title: string;
    completed: boolean;
    userId?: number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}