import { NextFunction, Request, Response } from 'express';
import { CustomError } from './errors';

/**
 * Don't worry about anything in this file,
 * focus on writing your snake logic in index.js endpoints.
 */

const poweredByHandler = (
  _: Request,
  res: Response,
  next: NextFunction
): void => {
  res.setHeader('X-Powered-By', 'Battlesnake');
  next();
};

const fallbackHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): Express.Response | void => {
  // Root URL path
  if (req.baseUrl === '') {
    res.status(200);
    return res.send(`
      Battlesnake documentation can be found at
       <a href="https://docs.battlesnake.io">https://docs.battlesnake.io</a>.
    `);
  }

  // Short-circuit favicon requests
  if (req.baseUrl === '/favicon.ico') {
    res.set({ 'Content-Type': 'image/x-icon' });
    res.status(200);
    res.end();
    return next();
  }

  // Reroute all 404 routes to the 404 handler
  const err = new CustomError('Not found', { status: 404 });
  return next(err);
};

const genericErrorHandler = (
  err: CustomError,
  _: Request,
  res: Response,
  next: NextFunction
): Express.Response | void => {
  // This will never be called but to satisfy Typescript, we make use of it.
  if (!err) next();

  if (err.status === 404) {
    res.status(404);
    return res.send({
      status: 404,
      error: err.message || "These are not the snakes you're looking for",
    });
  }

  const { status } = err;

  res.status(status);
  return res.send({
    error: err,
    status,
  });
};

export { fallbackHandler, genericErrorHandler, poweredByHandler };
