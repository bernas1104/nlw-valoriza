import { getCustomRepository, Not } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../../domain/entities/User';
import UsersRepository from '../../infra/repositories/UsersRepository';
import IUserService, { IUserRequest } from './interfaces/IUserService';

export default class UsersService implements IUserService {
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

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
      admin,
    });

    await usersRepository.save(user);

    return user;
  }

  // eslint-disable-next-line camelcase
  public async listUsers(user_id: string): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find({ where: { id: Not(user_id) } });

    return users;
  }
}
