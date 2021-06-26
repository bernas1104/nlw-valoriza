import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UsersRepository from '../repositories/UsersRepository';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

export default class AuthenticationService {
  public async authenticateUser({
    email,
    password,
  }: IAuthenticateRequest): Promise<string> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ email });
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
