import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import rolesmiddleware from '@/middlewares/roles.middleware';
import Roles from '@/roles/roles';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(`${this.path}/:id`, [AuthMiddleware, rolesmiddleware([Roles.ADMIN], true)], this.usersController.getUserById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), this.usersController.createUser);
    this.router.put(
      `${this.path}/:id`,
      [ValidationMiddleware(CreateUserDto, true), AuthMiddleware, rolesmiddleware([Roles.ADMIN], true)],
      this.usersController.updateUser,
    );
    this.router.delete(`${this.path}/:id`, [AuthMiddleware, rolesmiddleware([Roles.ADMIN], true)], this.usersController.deleteUser);
  }
}
