import { Request, Response } from 'express';
import { User } from '../entities/user.entity';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import HttpException from '../exceptions/http.exception';

class UserController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response) {
    const responseData = await this.authService.register(req.body);
    res.status(201).send(responseData);
  }

  async verifyEmail(req: Request, res: Response) {
    const token = await this.authService.verifyEmail(req.params.token);
    if (!token) {
      throw new HttpException(500, 'Internal Server Error');
    }
    res.redirect(`${process.env.CLIENT_URL}/login`);
  }

  async resendVerifyEmail(req: Request, res: Response) {
    const responseData = await this.authService.resendVerifyEmail(req.body);
    res.send(responseData);
  }

  async login(req: Request, res: Response) {
    const responseData = await this.authService.login(req.body);
    res.send(responseData);
  }

  async logout(req: Request, res: Response) {
    await this.authService.logout(req.user as Pick<User, 'id'>);
    res.status(204).send();
  }

  async currentUser(req: Request, res: Response) {
    const responseData = await this.authService.currentUser(req.user as Pick<User, 'id' | 'email'>);
    res.send(responseData);
  }

  async forgotPassword(req: Request, res: Response) {
    const responseData = await this.authService.forgotPassword(req.body);
    res.send(responseData);
  }

  async changePassword(req: Request, res: Response) {
    const responseData = await this.authService.changePassword(req.body);
    res.send(responseData);
  }
}

export default new UserController(new AuthService(new UserService()));
