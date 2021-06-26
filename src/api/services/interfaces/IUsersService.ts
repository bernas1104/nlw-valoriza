/* eslint-disable camelcase */
import User from '../../../domain/entities/User';

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

export default interface IUsersService {
  createUser(data: IUserRequest): Promise<User>;
  listUsers(): Promise<User[]>;
}
