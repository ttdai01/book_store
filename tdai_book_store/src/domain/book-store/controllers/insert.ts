import { RequestHandler, Request, Response } from 'express';
import logger from '../../../logger';
import { BookDocument } from '../schema/book-schema';
import BookService from '../services/book-service'

export const insert: RequestHandler = async (req: Request, res: Response, next) => {
  try {
    logger.info('--------------------insert--------------------');
    const { books } =  req.body;
    res.send(await BookService.insertBook(books));
  } catch (err) {
    next(err);
  }
};
