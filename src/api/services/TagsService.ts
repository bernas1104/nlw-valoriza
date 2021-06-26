import { getCustomRepository } from 'typeorm';
import Tag from '../entities/Tag';
import TagsRepository from '../repositories/TagsRepository';

export default class TagsService {
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
