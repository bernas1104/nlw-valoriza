/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../../infra/repositories/UsersRepository';

export default async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const usersRepository = getCustomRepository(UsersRepository);

  const { admin } = await usersRepository.findOneOrFail({
    id: request.user_id,
  });

  if (admin) {
    return next();
  }

  return response.status(403).json({
    error: 'Forbidden',
  });
}
