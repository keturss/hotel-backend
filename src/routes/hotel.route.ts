import { Router } from 'express';
import { HotelController } from '@controllers/hotel.controller';
import { CreateHotelDto } from '@dtos/hotel.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import rolesmiddleware from '@/middlewares/roles.middleware';
import Roles from '@/roles/roles';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class HotelRoute implements Routes {
  public path = '/hotel';
  public router = Router();
  public hotelController = new HotelController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * tags:
     *   - name: Hotel
     *     description: Hotel endpoints
     */
    /**
     * @swagger
     * /hotel:
     *   get:
     *     summary: Get a list of hotels
     *     description: Retrieve a list of hotels.
     *     tags:
     *       - Hotel
     *     responses:
     *       '200':
     *         description: A successful response
     *         content:
     *           application/json:
     *             example:
     *               hotels: [{ id: 1, name: 'Hotel ABC', location: 'Tours', description: 'Test', picture_list: 'image.png' }]
     */

    this.router.get(`${this.path}`, this.hotelController.gethotels);

    /**
     * @swagger
     * /hotel/{id}:
     *   get:
     *     summary: Get a hotel by ID
     *     description: Retrieve a hotel by its ID.
     *     tags:
     *       - Hotel
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the hotel.
     *     responses:
     *       '200':
     *         description: A successful response
     *         content:
     *           application/json:
     *             example:
     *               hotel: { id: 1, name: 'Hotel ABC', location: 'Tours', description: 'Test', picture_list: 'image.png' }
     */

    this.router.get(`${this.path}/:id`, this.hotelController.getHotelById);

    /**
     * @swagger
     * /hotel:
     *   post:
     *     summary: Create a new hotel
     *     description: Create a new hotel with the provided data.
     *     tags:
     *       - Hotel
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           example:
     *             name: Hotel ABC
     *             location: City XYZ
     *             description: test
     *             picture_list: image.png
     *     responses:
     *       '201':
     *         description: Hotel created successfully
     *       '400':
     *         description: Bad request - Invalid input data
     *     security:
     *       - BearerAuth: []
     */

    this.router.post(
      `${this.path}`,
      [ValidationMiddleware(CreateHotelDto), AuthMiddleware, rolesmiddleware([Roles.ADMIN])],
      this.hotelController.createHotel,
    );

    /**
     * @swagger
     * /hotel/{id}:
     *   put:
     *     summary: Update a hotel by ID
     *     description: Update a hotel's data by its ID.
     *     tags:
     *       - Hotel
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the hotel to update.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           example:
     *             name: Hotel ABC
     *             location: City XYZ
     *             description: test
     *             picture_list: image.png
     *     responses:
     *       '200':
     *         description: Hotel updated successfully
     *       '400':
     *         description: Bad request - Invalid input data
     *     security:
     *       - BearerAuth: []
     */

    this.router.put(
      `${this.path}/:id`,
      [ValidationMiddleware(CreateHotelDto, true), AuthMiddleware, rolesmiddleware([Roles.ADMIN])],
      this.hotelController.updateHotel,
    );

    /**
     * @swagger
     * /hotel/{id}:
     *   delete:
     *     summary: Delete a hotel by ID
     *     description: Delete a hotel by its ID.
     *     tags:
     *       - Hotel
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the hotel to delete.
     *     responses:
     *       '204':
     *         description: Hotel deleted successfully
     *     security:
     *       - BearerAuth: []
     */

    this.router.delete(`${this.path}/:id`, [AuthMiddleware, rolesmiddleware([Roles.ADMIN])], this.hotelController.deleteHotel);
  }
}
