import { Response, Request } from 'express';
import TodoService from '../services/todo.service';
import HttpException from '../exceptions/http.exception';
import { CreateTodoDto } from '../dto/create-todo.dto';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(_: Request, res: Response) {
    const todos = await this.todoService.getAllTodos();
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
    const dto: CreateTodoDto = req.body;
    const todo = await this.todoService.createTodo(dto);
    res.status(201).send(todo);
  }

  async deleteTodoById(req: Request, res: Response) {
    const { id } = req.params;
    const todo = await this.todoService.deleteTodoById(id);
    if (!todo) {
      throw new HttpException(404, `Requested todo with id ${id} not found`);
    }
    res.status(204).send();
  }

  async updateTodoById(req: Request, res: Response) {
    const dto: CreateTodoDto = req.body;
    const { id } = req.params;
    const todo = await this.todoService.updateTodoById(id, dto);
    res.send(todo);
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
