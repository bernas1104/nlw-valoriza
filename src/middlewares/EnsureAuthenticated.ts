import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface IPayload {
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Response | void {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).end();
  }

  const [, token] = authorization.split(' ');

  try {
    const { sub } = verify(
      token,
      '7cdd07d3f5494a8c0887681e8caf17a33c2a6d7f',
    ) as IPayload;

    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
