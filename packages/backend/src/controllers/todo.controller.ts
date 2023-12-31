import { Response, Request } from 'express';
import { User } from '../entities/user.entity';
import { Todo } from '../entities/todo.entity';
import TodoService from '../services/todo.service';
import HttpException from '../exceptions/http.exception';
import { GetTodosQuery } from '../types/todos.type';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(req: Request, res: Response) {
    const user = req.user as Pick<User, 'id' | 'email'>;
    const query = req.query as GetTodosQuery;
    const todos = await this.todoService.getAllTodos(user.id, query);
    res.send(todos);
  }

  async getTodoById(req: Request, res: Response) {
    const { id } = req.params;
    const todo = await this.todoService.getTodoById(id);
    if (!todo) {
      throw new HttpException(404, `Requested todo with id ${id} not found`);
    }
    res.send(todo);
  }

  async createTodo(req: Request, res: Response) {
    const user = req.user as Pick<User, 'id' | 'email'>;
    const dto: Todo = req.body;
    const todo = await this.todoService.createTodo(dto, user.id);
    res.status(201).send(todo);
  }

  async deleteTodoById(req: Request, res: Response) {
    const { id: userId } = req.user as Pick<User, 'id' | 'email'>;
    const { id } = req.params;
    const todo = await this.todoService.getTodoById(id);
    if (todo?.user.id !== userId) {
      throw new HttpException(403, 'You don`t have permission to do this action');
    }

    const result = await this.todoService.deleteTodoById(id);
    if (!result) {
      throw new HttpException(404, `Requested todo with id ${id} not found`);
    }
    res.status(204).send();
  }

  async updateTodoById(req: Request, res: Response) {
    const { id: userId } = req.user as Pick<User, 'id' | 'email'>;
    const dto: Todo = req.body;
    const { id } = req.params;
    const todo = await this.todoService.getTodoById(id);
    if (todo?.user.id !== userId) {
      throw new HttpException(403, 'You don`t have permission to do this action');
    }

    const result = await this.todoService.updateTodoById(id, dto);
    res.send(result);
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
