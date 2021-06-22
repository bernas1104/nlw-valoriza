import { Request, Response } from 'express';
import UsersService from '../services/UsersService';

export default class UsersController {
  public async handleCreateUser(request: Request, response: Response): Promise<Response> {
    const { name, email, admin, password } = request.body;

    const usersService = new UsersService();

    return response.status(201).json(
      await usersService.createUser({
        name,
        email,
        admin,
        password
      })
    );
  }
}
