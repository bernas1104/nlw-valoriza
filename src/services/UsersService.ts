import { getCustomRepository } from 'typeorm';
import User from '../entities/User';
import UsersRepository from '../repositories/UsersRepository';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

export default class UsersService {
  public async createUser({
    name,
    email,
    password,
    admin,
  }: IUserRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new Error('Invalid e-mail');
    }

    const userAlreadyExists = await usersRepository.findOne({ email });
    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const user = usersRepository.create({
      name,
      email,
      password,
      admin,
    });

    await usersRepository.save(user);

    return user;
  }
}
