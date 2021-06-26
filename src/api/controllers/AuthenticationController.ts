import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticationService from '../services/AuthenticationService';

export default class AuthenticationControler {
  public async handleLogin(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;

    const authenticationService = container.resolve(AuthenticationService);

    return response
      .status(200)
      .json(await authenticationService.authenticateUser({ email, password }));
  }
}
