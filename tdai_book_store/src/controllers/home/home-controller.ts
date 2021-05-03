import { RequestHandler, Request, Response } from 'express';

export const greetings: RequestHandler = async (req: Request, res: Response, next) => {
  try {
    res.send(`Welcome back, ${req.query['userInfo.userName']}`);
  } catch (err) {
    next(err);
  }
};
