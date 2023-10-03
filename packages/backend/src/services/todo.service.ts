import { DeepPartial } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { User } from '../entities/user.entity';

export default class TodoService {
  async getAllTodos(id: string): Promise<Todo[] | null> {
    const queryBuilder = Todo.createQueryBuilder('todo').where('todo.isPrivate = :isPrivate', {
      isPrivate: false
    });

    if (id) {
      queryBuilder.orWhere('todo.userId = :userId', { userId: id });
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
