/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import UsersRepository from '../../infra/repositories/UsersRepository';

export default async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const usersRepository = container.resolve(UsersRepository);

  const { admin } = await usersRepository.findByIdOrFail(request.user_id);

  if (admin) {
    return next();
  }

  return response.status(403).json({
    error: 'Forbidden',
  });
}
