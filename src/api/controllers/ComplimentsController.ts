/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import ComplimentsService from '../services/ComplimentsService';

export default class ComplimentsController {
  public async handleCreateCompliment(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { tag_id, message, user_receiver } = request.body;
    const { user_id: user_sender } = request;

    const complimentsService = container.resolve(ComplimentsService);

    return response.status(201).json(
      await complimentsService.createCompliment({
        tag_id,
        message,
        user_receiver,
        user_sender,
      }),
    );
  }

  public async handleListUsersSentCompliments(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { user_id } = request;

    const complimentsService = container.resolve(ComplimentsService);

    const compliments = await complimentsService.listUserSentCompliments(
      user_id,
    );

    return response.status(200).json(classToClass(compliments));
  }

  public async handleListUsersReceivedCompliments(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { user_id } = request;

    const complimentsService = container.resolve(ComplimentsService);

    const compliments = await complimentsService.listUserReceivedCompliments(
      user_id,
    );

    return response.status(200).json(classToClass(compliments));
  }
}
