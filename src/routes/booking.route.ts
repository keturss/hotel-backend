import { Router } from 'express';
import { BookingController } from '@controllers/booking.controller';
import { CreateBookingDto } from '@dtos/booking.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import rolesmiddleware from '@/middlewares/roles.middleware';
import Roles from '@/roles/roles';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class BookingRoute implements Routes {
  public path = '/booking';
  public router = Router();
  public bookingController = new BookingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * tags:
     *   - name: Booking
     *     description: Booking endpoints
     */
    /**
     * @swagger
     * /bookings:
     *   get:
     *     summary: Get a list of bookings
     *     description: Retrieve a list of bookings.
     *     tags:
     *       - Booking
     *     responses:
     *       '200':
     *         description: A successful response
     *         content:
     *           application/json:
     *             example:
     *               bookings: [{ id: 1, userId: 'foidnezaop^NINAZEUDP9UNun', hotelId: 'azeazejnazenpuc', date: '' }]
     */

    this.router.get(`${this.path}`, this.bookingController.getBookings);

    /**
     * @swagger
     * /bookings/{id}:
     *   get:
     *     summary: Get a booking by ID
     *     description: Retrieve a booking by its ID.
     *     tags:
     *       - Booking
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the booking.
     *     responses:
     *       '200':
     *         description: A successful response
     *         content:
     *           application/json:
     *             example:
     *               booking: { id: 1, userId: 'foidnezaop^NINAZEUDP9UNun', hotelId: 'azeazejnazenpuc', date: '' }
     */

    this.router.get(`${this.path}/:id`, this.bookingController.getBookingById);

    /**
     * @swagger
     * /bookings:
     *   post:
     *     summary: Create a new booking
     *     description: Create a new booking with the provided data.
     *     tags:
     *       - Booking
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           example:
     *             userId: foidnezaop^NINAZEUDP9UNun
     *             hotelId: foidnezaop^NINAZEUDP9UNun
     *             date: 1284812
     *     responses:
     *       '201':
     *         description: Booking created successfully
     *       '400':
     *         description: Bad request - Invalid input data
     *     security:
     *       - BearerAuth: []
     */

    this.router.post(
      `${this.path}`,
      [ValidationMiddleware(CreateBookingDto), AuthMiddleware, rolesmiddleware([Roles.ADMIN], true)],
      this.bookingController.createBookin,
    );

    /**
     * @swagger
     * /bookings/{id}:
     *   put:
     *     summary: Update a booking by ID
     *     description: Update a booking's data by its ID.
     *     tags:
     *       - Booking
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the booking to update.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           example:
     *             userId: foidnezaop^NINAZEUDP9UNun
     *             hotelId: foidnezaop^NINAZEUDP9UNun
     *             date: 1284812
     *     responses:
     *       '200':
     *         description: Booking updated successfully
     *       '400':
     *         description: Bad request - Invalid input data
     *     security:
     *       - BearerAuth: []
     */

    this.router.put(
      `${this.path}/:id`,
      [ValidationMiddleware(CreateBookingDto, true), AuthMiddleware, rolesmiddleware([Roles.ADMIN], true)],
      this.bookingController.updateBookin,
    );

    /**
     * @swagger
     * /bookings/{id}:
     *   delete:
     *     summary: Delete a booking by ID
     *     description: Delete a booking by its ID.
     *     tags:
     *       - Booking
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the booking to delete.
     *     responses:
     *       '204':
     *         description: Booking deleted successfully
     *     security:
     *       - BearerAuth: []
     */

    this.router.delete(`${this.path}/:id`, [AuthMiddleware, rolesmiddleware([Roles.ADMIN], true)], this.bookingController.deleteBookin);
  }
}
