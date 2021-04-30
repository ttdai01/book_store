import { RequestHandler, Request, Response } from 'express';

export const greetings: RequestHandler = async (req: Request, res: Response, next) => {
  try {
    console.log('hello')
    res.send(`Welcome back, ${req.query['name']}`);
  } catch (err) {
    next(err);
  }
};
