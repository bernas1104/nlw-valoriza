/* eslint-disable camelcase */
import { Request, Response } from 'express';
import ComplimentsService from '../services/ComplimentsService';

export default class ComplimentsController {
  public async handleCreateCompliment(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { tag_id, message, user_receiver, user_sender } = request.body;

    const complimentsService = new ComplimentsService();

    return response.status(201).json(
      await complimentsService.createCompliment({
        tag_id,
        message,
        user_receiver,
        user_sender,
      }),
    );
  }
}
