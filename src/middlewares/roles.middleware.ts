import { NextFunction, RequestHandler, Response } from 'express';
import { RequestWithUser } from '@/interfaces/auth.interface';
import Roles from '@/roles/roles';
import { HttpException } from '@/exceptions/httpException';

const rolesmiddleware = (permittedRoles: Array<Roles>, me = false): RequestHandler => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;

    if ((user && permittedRoles.includes(user.role)) || (me && user._id == req.params.id)) {
      next();
    } else {
      next(new HttpException(403, 'Forbidden for roles'));
    }
  };
};

export default rolesmiddleware;
