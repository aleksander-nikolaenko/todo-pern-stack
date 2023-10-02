import HttpService from './http.service';
import { BACKEND_KEYS } from '../modules/common/consts/app-keys.const';
import { Todo, CreateTodo, UpdateTodo } from '../modules/common/types/todo.types';

class TodoService extends HttpService {
  async getTodos(): Promise<Todo[]> {
    const result = await this.get({
      url: BACKEND_KEYS.TODO
    });
    return result.data.reverse();
  }

  async getTodo(id: string): Promise<Todo> {
    const result = await this.get({
      url: `${BACKEND_KEYS.TODO}/${id}`
    });
    return result.data;
  }

  async deleteTodo(id: string): Promise<{}> {
    const result = await this.delete({
      url: `${BACKEND_KEYS.TODO}/${id}`
    });
    return result.data;
  }

  async createTodo(todo: CreateTodo): Promise<Todo> {
    const result = await this.post({
      url: BACKEND_KEYS.TODO,
      data: todo
    });
    return result.data;
  }

  async updateTodo(id: string, todo: UpdateTodo): Promise<Todo> {
    const result = await this.patch({
      url: `${BACKEND_KEYS.TODO}/${id}`,
      data: todo
    });
    return result.data;
  }
}

export default new TodoService();
