/* eslint-disable camelcase */
import User from '../../../domain/entities/User';

export interface ICreateUser {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  admin?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export default interface IUsersRepository {
  create(user: ICreateUser): User;
  findById(id: string): Promise<User | undefined>;
  findByIdOrFail(id: string): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
  getAll(): Promise<User[]>;
}
