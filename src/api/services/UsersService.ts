import { getCustomRepository, Not } from 'typeorm';
import { hash } from 'bcryptjs';
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
