import { Todo } from '../entities/todo.entity';

export interface GetTodosQuery {
  search?: string;
  status?: string;
  page?: string;
  limit?: string;
}

export interface Pagination {
  totalTodos: number;
  totalPages: number;
}

export interface GetTodosResponse {
  todos: Todo[];
  pagination: Pagination;
}
