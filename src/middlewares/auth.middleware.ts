import * as jwt from 'jsonwebtoken';
import config from '../config';
import { INext, IRequest, IResponse } from '../interfaces/http.interface';

export default (req: IRequest, res: IResponse, next: INext) => {
  const header = req.header(config.HEADER_NAME);
  if (!header) return res.unauthorized();

  try {
    const decoded = jwt.verify(header, config.JWT_SECRET);
    if (!decoded) return res.unauthorized();
    req.user = decoded;
    next();
  } catch (error) {
    res.unauthorized(error);
  }
};
