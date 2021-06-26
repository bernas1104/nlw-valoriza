/* eslint-disable camelcase */
import IUsersRepository from 'infra/repositories/interfaces/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import Compliment from '../../domain/entities/Compliment';
import ComplimentsRepository from '../../infra/repositories/ComplimentsRepository';
import TagsRepository from '../../infra/repositories/TagsRepository';
import IComplimentsService, {
  IComplimentRequest,
} from './interfaces/IComplimentsService';

@injectable()
export default class ComplimentsService implements IComplimentsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async createCompliment({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: IComplimentRequest): Promise<Compliment> {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);
    const tagsRepository = getCustomRepository(TagsRepository);

    if (user_sender === user_receiver) {
      throw new Error('Compliment sender must be different than receiver');
    }

    const userReceiverExists = await this.usersRepository.findById(
      user_receiver,
    );
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

  public async listUserSentCompliments(
    user_sender: string,
  ): Promise<Compliment[]> {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const compliments = await complimentsRepository.find({
      where: { user_sender },
      relations: ['userSender', 'userReceiver', 'tag'],
    });

    return compliments;
  }

  public async listUserReceivedCompliments(
    user_receiver: string,
  ): Promise<Compliment[]> {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const compliments = await complimentsRepository.find({
      where: { user_receiver },
      relations: ['userSender', 'userReceiver', 'tag'],
    });

    return compliments;
  }
}
