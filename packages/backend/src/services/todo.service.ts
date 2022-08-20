import { DeepPartial } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { CreateTodoDto } from '../dto/create-todo.dto';

export default class TodoService {
  async getAllTodos() {
    const result = await Todo.find();
    return result;
  }

  async getTodoById(id: string) {
    const result = await Todo.findOneBy({ id });
    return result;
  }

  async createTodo(dto: CreateTodoDto) {
    const result = await Todo.save(dto as DeepPartial<Todo>);
    return result;
  }

  async deleteTodoById(id: string) {
    const result = await Todo.delete(id);
    return result;
  }

  async updateTodoById(id: string, dto: CreateTodoDto) {
    await Todo.update(id, dto);
    const result = await Todo.findOneBy({ id });
    return result;
  }
}
