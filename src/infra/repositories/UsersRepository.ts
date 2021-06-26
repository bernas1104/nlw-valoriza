import { Repository, EntityRepository } from 'typeorm';
import User from '../../domain/entities/User';

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {}
