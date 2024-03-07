import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /auth/signup:
     *   post:
     *     summary: Sign up a new user
     *     description: Sign up a new user with the provided data.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           example:
     *             username: john_doe
     *             password: secretpassword
     *             email: john.doe@example.com
     *     responses:
     *       '201':
     *         description: User signed up successfully
     *       '400':
     *         description: Bad request - Invalid input data
     */

    this.router.post(`${this.path}signup`, ValidationMiddleware(CreateUserDto), this.authController.signUp);

    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Log in a user
     *     description: Log in a user with the provided credentials.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           example:
     *             username: john_doe
     *             password: secretpassword
     *     responses:
     *       '200':
     *         description: User logged in successfully
     *       '401':
     *         description: Unauthorized - Invalid credentials
     */

    this.router.post(`${this.path}login`, ValidationMiddleware(CreateUserDto), this.authController.logIn);

    /**
     * @swagger
     * /auth/logout:
     *   post:
     *     summary: Log out a user
     *     description: Log out the currently authenticated user.
     *     responses:
     *       '200':
     *         description: User logged out successfully
     *       '401':
     *         description: Unauthorized - User not authenticated
     */

    this.router.post(`${this.path}logout`, AuthMiddleware, this.authController.logOut);
  }
}
