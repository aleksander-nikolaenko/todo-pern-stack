import { User } from '../entities/user.entity';

export interface Todo {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isPrivate: boolean;
  isAuth: boolean;
  user: User;
}

export interface GetTodoQuery {
  search?: string | undefined;
  status?: string | undefined;
}
