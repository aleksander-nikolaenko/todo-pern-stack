import { DeepPartial } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { User } from '../entities/user.entity';
import { GetTodosQuery, GetTodosResponse } from '../types/todos.type';
import { FilterOptions } from '../enums';

export default class TodoService {
  async getAllTodos(id: string, query: GetTodosQuery): Promise<GetTodosResponse | null> {
    const { page = '1', limit = '', search = '', status = '' } = query;

    const skip = (+page - 1) * +limit;

    const queryBuilder = Todo.createQueryBuilder('todo')
      .leftJoinAndSelect('todo.user', 'user')
      .select(['todo', 'user.id', 'user.email', 'user.isVerified']);

    switch (status) {
      case FilterOptions.All:
        queryBuilder
          .andWhere('user.id = :userId', { userId: id })
          .andWhere('todo.title ILike :title', { title: `%${search}%` });
        queryBuilder
          .orWhere('user.id != :userId', { userId: id })
          .andWhere('todo.isPrivate = false')
          .andWhere('todo.title ILike :title', { title: `%${search}%` });
        break;

      case FilterOptions.Private:
        queryBuilder
          .andWhere('user.id = :userId', { userId: id })
          .andWhere('todo.isPrivate = true')
          .andWhere('todo.title ILike :title', { title: `%${search}%` });
        break;

      case FilterOptions.Public:
        queryBuilder
          .andWhere('user.id = :userId', { userId: id })
          .andWhere('todo.isPrivate = false')
          .andWhere('todo.title ILike :title', { title: `%${search}%` });
        queryBuilder
          .orWhere('user.id != :userId', { userId: id })
          .andWhere('todo.isPrivate = false')
          .andWhere('todo.title ILike :title', { title: `%${search}%` });
        break;

      case FilterOptions.Completed:
        queryBuilder
          .andWhere('user.id = :userId', { userId: id })
          .andWhere('todo.isCompleted = true')
          .andWhere('todo.title ILike :title', { title: `%${search}%` });
        queryBuilder
          .orWhere('user.id != :userId', { userId: id })
          .andWhere('todo.isPrivate = false')
          .andWhere('todo.isCompleted = true')
          .andWhere('todo.title ILike :title', { title: `%${search}%` });
        break;

      default:
        queryBuilder
          .andWhere('user.id = :userId', { userId: id })
          .andWhere('todo.title ILike :title', { title: `%${search}%` });
        queryBuilder
          .orWhere('user.id != :userId', { userId: id })
          .andWhere('todo.isPrivate = false')
          .andWhere('todo.title ILike :title', { title: `%${search}%` });
        break;
    }

    const [todos, totalTodos] = await queryBuilder
      .orderBy('todo.title')
      .skip(skip)
      .take(+limit)
      .getManyAndCount();
    const totalPages = Math.ceil(totalTodos / +limit);

    return { todos, pagination: { totalTodos, totalPages } };
  }

  async getTodoById(id: string) {
    const result = await Todo.findOneBy({ id });
    return result;
  }

  async createTodo(dto: DeepPartial<Todo>, id: User['id']) {
    const result = await Todo.save({ ...dto, user: { id } });
    return result;
  }

  async deleteTodoById(id: string) {
    const result = await Todo.delete(id);
    return result;
  }

  async updateTodoById(id: string, dto: DeepPartial<Todo>) {
    await Todo.update(id, dto);
    const result = await Todo.findOneBy({ id });
    return result;
  }
}
