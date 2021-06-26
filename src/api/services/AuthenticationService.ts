import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../../infra/repositories/interfaces/IUsersRepository';
import IAuthenticationService, {
  IAuthenticateRequest,
} from './interfaces/IAuthenticationService';

@injectable()
export default class AuthenticationService implements IAuthenticationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async authenticateUser({
    email,
    password,
  }: IAuthenticateRequest): Promise<string> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new Error('Incorrect e-mail/password combination');
    }

    const verifyPassword = await compare(password, user.password);
    if (!verifyPassword) {
      throw new Error('Incorrect e-mail/password combination');
    }

    const token = sign(
      {
        email: user.email,
      },
      '7cdd07d3f5494a8c0887681e8caf17a33c2a6d7f',
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    return token;
  }
}
