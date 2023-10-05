export interface Todo {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isPrivate: boolean;
}

export type CreateTodo = Pick<Todo, 'title' | 'description' | 'isCompleted' | 'isPrivate'>;

export type UpdateTodo = Partial<CreateTodo>;

export interface GetTodosQueryParams {
  search: string;
  status: string;
}
