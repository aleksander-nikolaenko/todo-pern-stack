/* eslint-disable no-console */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { User } from '../entities/user.entity';

export const AppDataSource = new DataSource({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  logging: ['query', 'error'],
  type: 'postgres',
  entities: [Todo, User],
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: { rejectUnauthorized: true },
  synchronize: true
});

const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('DB Connected...');
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
    console.error(err);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
