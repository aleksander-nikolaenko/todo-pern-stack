import HttpService from './http.service';
import { BACKEND_KEYS } from '../modules/common/consts/app-keys.const';
import { ChangePassword } from '../modules/common/types';

class UserService extends HttpService {
  async getCurrentUser() {
    const result = await this.get({
      url: BACKEND_KEYS.USER
    });
    return result.data;
  }

  async changeUserPassword(user: ChangePassword) {
    const result = await this.patch({
      url: BACKEND_KEYS.USER_CHANGE_PASSWORD,
      data: user
    });
    return result.data;
  }
}

export default new UserService();
