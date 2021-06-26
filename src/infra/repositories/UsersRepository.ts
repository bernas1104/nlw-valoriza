import { Repository, getRepository } from 'typeorm';
import User from '../../domain/entities/User';
import IUsersRepository, { ICreateUser } from './interfaces/IUsersRepository';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public create(user: ICreateUser): User {
    const newUser = new User();

    Object.assign(newUser, { ...user });

    return this.ormRepository.create(newUser);
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ id });
  }

  public async findByIdOrFail(id: string): Promise<User> {
    return this.ormRepository.findOneOrFail({ id });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ email });
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async getAll(): Promise<User[]> {
    return this.ormRepository.find();
  }
}
