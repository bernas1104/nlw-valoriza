import { Repository, EntityRepository } from 'typeorm';
import Tag from '../../domain/entities/Tag';

@EntityRepository(Tag)
export default class TagsRepository extends Repository<Tag> {}
