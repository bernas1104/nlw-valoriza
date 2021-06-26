import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import User from '../../domain/entities/User';
import IUserService, { IUserRequest } from './interfaces/IUsersService';
import IUsersRepository from '../../infra/repositories/interfaces/IUsersRepository';

@injectable()
export default class UsersService implements IUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async createUser({
    name,
    email,
    password,
    admin,
  }: IUserRequest): Promise<User> {
    if (!email) {
      throw new Error('Invalid e-mail');
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      admin,
    });

    await this.usersRepository.save(user);

    return user;
  }

  public async listUsers(): Promise<User[]> {
    const users = await this.usersRepository.getAll();

    return users;
  }
}
