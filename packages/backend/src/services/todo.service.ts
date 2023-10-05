import { DeepPartial } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { User } from '../entities/user.entity';
import { GetTodoQuery } from '../types/todos.type';
import { FilterOptions } from '../enums';

export default class TodoService {
  async getAllTodos(id: string, query: GetTodoQuery): Promise<Todo[] | null> {
    const { search = '', status = '' } = query;
    const queryBuilder = Todo.createQueryBuilder('todo')
      .leftJoinAndSelect('todo.user', 'user')
      .select(['todo', 'user.id', 'user.email', 'user.isVerified']);

    switch (status) {
      case FilterOptions.All:
        queryBuilder.andWhere(
          '(user.id = :userId AND todo.title ILike :title)OR(user.id != :userId AND todo.isPrivate = false AND todo.title ILike :title)',
          { userId: id, title: `%${search}%` }
        );
        break;

      case FilterOptions.Private:
        queryBuilder.andWhere(
          'user.id = :userId AND todo.isPrivate = true AND todo.title ILike :title',
          {
            userId: id,
            title: `%${search}%`
          }
        );
        break;

      case FilterOptions.Public:
        queryBuilder.andWhere(
          '(user.id = :userId AND todo.isPrivate = false AND todo.title ILike :title)' +
            'OR(user.id != :userId AND todo.isPrivate = false AND todo.title ILike :title)',
          { userId: id, title: `%${search}%` }
        );
        break;

      case FilterOptions.Completed:
        queryBuilder.andWhere(
          '(user.id = :userId AND todo.isCompleted = true AND todo.title ILike :title)' +
            'OR(user.id != :userId AND todo.isPrivate = false AND todo.isCompleted = true AND todo.title ILike :title)',
          { userId: id, title: `%${search}%` }
        );

        break;

      default:
        queryBuilder.andWhere(
          '(user.id = :userId AND todo.title ILike :title)OR(user.id != :userId AND todo.isPrivate = false AND todo.title ILike :title)',
          { userId: id, title: `%${search}%` }
        );
        break;
    }

    const result = await queryBuilder.orderBy('todo.title').getMany();
    return result;
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
