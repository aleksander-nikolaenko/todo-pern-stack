import { DeepPartial } from 'typeorm';
import { User } from '../entities/user.entity';

export default class UserService {
  async createUser(dto: DeepPartial<User>) {
    const result = await User.save(dto as DeepPartial<User>);
    return result;
  }

  async getUserById(id: User['id']) {
    const result = await User.findOneBy({ id });
    return result;
  }

  async getUserByEmail(email: User['email']) {
    const result = await User.findOneBy({ email });
    return result;
  }

  async getUserByVerificationToken(verificationToken: User['verificationToken']) {
    const result = await User.findOneBy({ verificationToken });
    return result;
  }

  async updateUserById(id: string, dto: DeepPartial<User>) {
    await User.update(id, dto);
    const result = await User.findOneBy({ id });
    return result;
  }

  removePassword(user: User): Omit<User, 'password'> {
    const { password, ...data } = user;
    return data as Omit<User, 'password'>;
  }
}
