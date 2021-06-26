/* eslint-disable camelcase */
import Compliment from '../../../domain/entities/Compliment';

export interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

export default interface IComplimentsService {
  createCompliment(data: IComplimentRequest): Promise<Compliment>;
  listUserSentCompliments(user_sender: string): Promise<Compliment[]>;
  listUserReceivedCompliments(user_receiver: string): Promise<Compliment[]>;
}
