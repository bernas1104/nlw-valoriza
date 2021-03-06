import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import UsersService from '../services/UsersService';

export default class UsersController {
  public async handleCreateUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, email, admin, password } = request.body;

    const usersService = container.resolve(UsersService);

    return response.status(201).json(
      await usersService.createUser({
        name,
        email,
        admin,
        password,
      }),
    );
  }

  public async handleListUsers(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const usersService = container.resolve(UsersService);

    return response
      .status(200)
      .json(classToClass(await usersService.listUsers()));
  }
}
