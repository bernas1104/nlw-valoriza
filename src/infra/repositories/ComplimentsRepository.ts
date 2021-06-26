import { Repository, EntityRepository } from 'typeorm';
import Compliment from '../../domain/entities/Compliment';

@EntityRepository(Compliment)
export default class ComplimentsRepository extends Repository<Compliment> {}
