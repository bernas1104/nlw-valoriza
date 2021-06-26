import { container } from 'tsyringe';
import IUsersRepository from '../../infra/repositories/interfaces/IUsersRepository';
import UsersRepository from '../../infra/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
