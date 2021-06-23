import { Request, Response } from 'express';
import TagsService from '../services/TagsService';

export default class TagsController {
  public async handleCreateTag(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name } = request.body;

    const tagsService = new TagsService();

    return response.status(201).json(await tagsService.createTag(name));
  }
}
