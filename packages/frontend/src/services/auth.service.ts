import HttpService from './http.service';
import { BACKEND_KEYS } from '../modules/common/consts/app-keys.const';
import {
  UserCredentials,
  RegisterCredentials,
  ChangePassword,
  User
} from '../modules/common/types';

class AuthService extends HttpService {
  async getCurrentUser(): Promise<{ message: string; user: User }> {
    const result = await this.get({
      url: BACKEND_KEYS.USER
    });
    return result.data;
  }

  async register(user: RegisterCredentials): Promise<{ message: string; user: User }> {
    const result = await this.post({
      url: BACKEND_KEYS.USER_REGISTER,
      data: user
    });
    return result.data;
  }

  async login(user: UserCredentials) {
    const result = await this.post({
      url: BACKEND_KEYS.USER_LOGIN,
      data: user
    });
    return result.data;
  }

  async logout() {
    const result = await this.get({
      url: BACKEND_KEYS.USER_LOGOUT
    });
    return result.data;
  }

  async forgot(user: Pick<UserCredentials, 'email'>) {
    const result = await this.post({
      url: BACKEND_KEYS.USER_FORGOT,
      data: user
    });
    return result.data;
  }

  async changePassword(user: ChangePassword) {
    const result = await this.patch({
      url: BACKEND_KEYS.USER_CHANGE_PASSWORD,
      data: user
    });
    return result.data;
  }

  async sendVerify(user: Pick<UserCredentials, 'email'>) {
    const result = await this.post({
      url: BACKEND_KEYS.USER_VERIFY,
      data: user
    });
    return result.data;
  }
}

export default new AuthService();
