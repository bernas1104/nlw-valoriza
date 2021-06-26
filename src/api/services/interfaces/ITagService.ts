import Tag from 'domain/entities/Tag';

export default interface ITagService {
  createTag(name: string): Promise<Tag>;
  listTags(): Promise<Tag[]>;
}
