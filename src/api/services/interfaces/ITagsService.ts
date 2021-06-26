import Tag from '../../../domain/entities/Tag';

export default interface ITagsService {
  createTag(name: string): Promise<Tag>;
  listTags(): Promise<Tag[]>;
}
