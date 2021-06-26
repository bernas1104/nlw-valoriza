/* eslint-disable camelcase */
import User from 'domain/entities/User';

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

export default interface IUserService {
  createUser(data: IUserRequest): Promise<User>;
  listUsers(user_id: string): Promise<User[]>;
}
