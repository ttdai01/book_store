import { RequestHandler, Request, Response } from 'express';
import { isEmpty } from '../../../utils/object-utils';
import logger from '../../../logger';

export const getEnv: RequestHandler = async (req: Request, res: Response, next) => {
  try {
    logger.info('--------------------dumb--------------------');
    const name =  req.params['name'];
    if(isEmpty(name)){
      res.send(process.env);  
      return next();
    }
    res.send(process.env[name]);
  } catch (err) {
    next(err);
  }
};
