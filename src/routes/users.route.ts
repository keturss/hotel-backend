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
    /**
     * @swagger
     * tags:
     *   - name: Users
     *     description: Users endpoints
     */
    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Get a list of users
     *     description: Retrieve a list of users.
     *     tags:
     *       - Users
     *     responses:
     *       '200':
     *         description: A successful response
     *         content:
     *           application/json:
     *             example:
     *               users: [{ id: 1, email: 'John@gmail.com', password: "ifjdbvGP9ZNDIUJBNWC", role: "ADMIN" }]
     */

    this.router.get(`${this.path}`, this.usersController.getUsers);

    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     summary: Get a user by ID
     *     description: Retrieve a user by its ID.
     *     tags:
     *       - Users
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the user.
     *     responses:
     *       '200':
     *         description: A successful response
     *         content:
     *           application/json:
     *             example:
     *               user: { id: 1, email: 'John@gmail.com', password: "ifjdbvGP9ZNDIUJBNWC", role: "ADMIN" }
     *     security:
     *       - BearerAuth: []
     */

    this.router.get(`${this.path}/:id`, [AuthMiddleware, rolesmiddleware([Roles.ADMIN], true)], this.usersController.getUserById);

    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Create a new user
     *     description: Create a new user with the provided data.
     *     tags:
     *       - Users
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           example:
     *             email: john_doe@gmail.com
     *             password: secretpassword
     *             role: ADMIN
     *     responses:
     *       '201':
     *         description: User created successfully
     *       '400':
     *         description: Bad request - Invalid input data
     *     security:
     *       - BearerAuth: []
     */

    this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), this.usersController.createUser);

    /**
     * @swagger
     * /users/{id}:
     *   put:
     *     summary: Update a user by ID
     *     description: Update a user's data by its ID.
     *     tags:
     *       - Users
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the user to update.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           example:
     *             email: updated.john.doe@example.com
     *             password: updatedsecretpassword
     *             role: USER
     *     responses:
     *       '200':
     *         description: User updated successfully
     *       '400':
     *         description: Bad request - Invalid input data
     *     security:
     *       - BearerAuth: []
     */

    this.router.put(
      `${this.path}/:id`,
      [ValidationMiddleware(CreateUserDto, true), AuthMiddleware, rolesmiddleware([Roles.ADMIN], true)],
      this.usersController.updateUser,
    );

    /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     summary: Delete a user by ID
     *     description: Delete a user by its ID.
     *     tags:
     *       - Users
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the user to delete.
     *     responses:
     *       '204':
     *         description: User deleted successfully
     *     security:
     *       - BearerAuth: []
     */

    this.router.delete(`${this.path}/:id`, [AuthMiddleware, rolesmiddleware([Roles.ADMIN], true)], this.usersController.deleteUser);
  }
}
