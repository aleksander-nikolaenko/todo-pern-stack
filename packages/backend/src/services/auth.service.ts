import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import randomatic from 'randomatic';
import { User } from '../entities/user.entity';
import UserService from './user.service';
import HttpException from '../exceptions/http.exception';
import emailService from './email.service';

export default class AuthService {
  constructor(private userService: UserService) {}

  private generateJWT(payload: { id: string }): string {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRATION;

    return jwt.sign(payload, secret, { expiresIn });
  }

  async register(dto: User) {
    const { email, password } = dto;
    const user = await this.userService.getUserByEmail(email);
    if (user) {
      throw new HttpException(409, `User with email ${email} already exists`);
    }
    const hashedPassword = await bcrypt.hash(password, 5);

    const verificationToken = await emailService.sendVerifyEmail(email);

    const newUser = await this.userService.createUser({
      email,
      password: hashedPassword,
      verificationToken
    });

    const userData = this.userService.removePassword(newUser);
    return {
      message: `User created. Please check your email: ${email} and confirm then`,
      user: {
        ...userData
      }
    };
  }

  async verifyEmail(token: string) {
    const user = await this.userService.getUserByVerificationToken(token);

    if (!user) throw new HttpException(400, 'Incorrect user link with token');

    await this.userService.updateUserById(user.id, { ...user, isVerified: true });

    return this.generateJWT({ id: user.id });
  }

  async resendVerifyEmail(user: Pick<User, 'email'>) {
    const findUser = await this.userService.getUserByEmail(user.email);

    if (!findUser) throw new HttpException(400, `Email: ${user.email} is wrong, user not found`);

    if (findUser.isVerified) {
      throw new HttpException(409, 'Verification has already been passed');
    }

    await emailService.sendVerifyEmail(findUser.email, findUser.verificationToken);
    return {
      message: `Verification email sent to ${findUser.email} email address`
    };
  }

  async login(dto: User) {
    const { email, password } = dto;

    const user = await this.userService.getUserByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new HttpException(400, 'Email or password is wrong');
    }
    if (!user.isVerified) {
      throw new HttpException(400, 'Email not verify');
    }

    const token = this.generateJWT({ id: user.id });

    const userData = this.userService.removePassword(user);
    return {
      message: 'Authentication success',
      token,
      user: { ...userData }
    };
  }

  async currentUser(user: Pick<User, 'id' | 'email'>) {
    const findUser = await this.userService.getUserById(user.id);

    if (!findUser) throw new HttpException(404, 'Not found user');

    const userData = this.userService.removePassword(findUser);

    return {
      message: 'Authentication success',
      user: { ...userData }
    };
  }

  async forgotPassword(user: Pick<User, 'email'>) {
    const findUser = await this.userService.getUserByEmail(user.email);

    if (!findUser) throw new HttpException(400, `Email: ${user.email} is wrong, user not found`);

    const newPassword =
      randomatic('Aa0!', 4) +
      randomatic('?', 2, { chars: '!@#$%^&*' }) +
      randomatic('A', 2) +
      randomatic('0', 2) +
      randomatic('a', 2);

    const hashPassword = await bcrypt.hash(newPassword, 5);

    const updateUser = await this.userService.updateUserById(findUser.id, {
      ...user,
      password: hashPassword
    });
    if (!updateUser) {
      throw new HttpException(500, 'Internal server error');
    }
    await emailService.sendNewPassword(user.email, newPassword);

    return {
      message: `New password sent to ${user.email} email address`
    };
  }

  async changePassword({
    email,
    oldPassword,
    newPassword
  }: {
    email: User['email'];
    oldPassword: User['password'];
    newPassword: User['password'];
  }) {
    const user = await this.userService.getUserByEmail(email);
    if (!user || !bcrypt.compareSync(oldPassword, user.password)) {
      throw new HttpException(400, 'Email or password is wrong');
    }
    const hashPassword = await bcrypt.hash(newPassword, 5);

    const updateUser = await this.userService.updateUserById(user.id, {
      ...user,
      password: hashPassword
    });
    if (!updateUser) {
      throw new HttpException(500, 'Internal server error');
    }

    return {
      message: `User ${email} has successfully changed the password`
    };
  }
}
