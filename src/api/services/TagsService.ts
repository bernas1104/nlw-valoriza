import { getCustomRepository } from 'typeorm';
import Tag from '../../domain/entities/Tag';
import TagsRepository from '../../infra/repositories/TagsRepository';
import ITagsService from './interfaces/ITagsService';

export default class TagsService implements ITagsService {
  public async createTag(name: string): Promise<Tag> {
    const tagsRepository = getCustomRepository(TagsRepository);

    if (!name) {
      throw new Error('Invalid tag name');
    }

    const tagAlreadyExists = await tagsRepository.findOne({ name });
    if (tagAlreadyExists) {
      throw new Error('Tag already exists');
    }

    const tag = tagsRepository.create({ name });

    await tagsRepository.save(tag);

    return tag;
  }

  public async listTags(): Promise<Tag[]> {
    const tagsRepository = getCustomRepository(TagsRepository);

    const tags = await tagsRepository.find();

    return tags;
  }
}
