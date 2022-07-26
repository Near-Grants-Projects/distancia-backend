import Constants from '../constants';
import { error } from 'express-openapi-validator';
import { Request, Response, NextFunction } from 'express';

export const errorHandlerMiddleware = (includeStackTrace: boolean) => {
  const allOpenApiErrors = Object.values(error);

  return (err: any, req: Request, res: Response, next: NextFunction) => {
    if (allOpenApiErrors.includes(err.constructor)) {
      res.status(err.status || 500).json({
        code: err.constructor.name,
        message: err.message,
        data: {
          errors: err.errors,
        },
      });
    } else if (err.response && err.response.data) {
      res.status(err.response.status || 500).json({
        code: err.code || err.name,
        message: err.response.data.message,
        data: {
          message: err.response.data.message,
        },
      });
    } else {
      if (process.env.NODE_ENV === 'DEV') {
        console.error(err?.stack);
      }
    }
  };
};
