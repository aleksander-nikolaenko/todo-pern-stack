import { User } from './user.types';

export interface Todo {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isPrivate: boolean;
  isAuth: boolean;
  user: User;
}

export type CreateTodo = Pick<Todo, 'title' | 'description' | 'isCompleted' | 'isPrivate'>;

export type UpdateTodo = Partial<CreateTodo>;

export interface GetTodosQueryParams {
  search: string;
  status: string;
  page: string;
  limit: string;
}

export interface Pagination {
  totalTodos: number;
  totalPages: number;
}

export interface GetTodosResponse {
  todos: Todo[];
  pagination: Pagination;
}
