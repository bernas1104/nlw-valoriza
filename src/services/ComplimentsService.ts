import { getCustomRepository } from 'typeorm';
import Compliment from '../entities/Compliment';
import ComplimentsRepository from '../repositories/ComplimentsRepository';
import TagsRepository from '../repositories/TagsRepository';
import UsersRepository from '../repositories/UsersRepository';

/* eslint-disable camelcase */
interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

export default class ComplimentsService {
  public async createCompliment({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: IComplimentRequest): Promise<Compliment> {
    const usersRepository = getCustomRepository(UsersRepository);
    const complimentsRepository = getCustomRepository(ComplimentsRepository);
    const tagsRepository = getCustomRepository(TagsRepository);

    if (user_sender === user_receiver) {
      throw new Error('Compliment sender must be different than receiver');
    }

    const userReceiverExists = await usersRepository.findOne({
      id: user_receiver,
    });
    if (!userReceiverExists) {
      throw new Error('Receiver does not exist');
    }

    const tag = await tagsRepository.findOne({ id: tag_id });
    if (!tag) {
      throw new Error('Tag does not exist');
    }

    const compliment = complimentsRepository.create({
      tag_id,
      message,
      user_sender,
      user_receiver,
    });

    await complimentsRepository.save(compliment);

    return compliment;
  }
}
