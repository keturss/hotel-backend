import { Router } from 'express';
import { BookingController } from '@controllers/booking.controller';
import { CreateBookingDto } from '@dtos/booking.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class BookingRoute implements Routes {
  public path = '/booking';
  public router = Router();
  public bookingController = new BookingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.bookingController.getBookings);
    this.router.get(`${this.path}/:id`, this.bookingController.getBookingById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateBookingDto), this.bookingController.createBookin);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateBookingDto, true), this.bookingController.updateBookin);
    this.router.delete(`${this.path}/:id`, this.bookingController.deleteBookin);
  }
}