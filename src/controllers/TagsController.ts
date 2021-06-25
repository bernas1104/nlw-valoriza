import { Request, Response } from 'express';
import { classToPlain } from 'class-transformer';
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

  public async handleListTags(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const tagsService = new TagsService();

    return response
      .status(200)
      .json(classToPlain(await tagsService.listTags()));
  }
}
