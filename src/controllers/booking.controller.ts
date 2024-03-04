import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Booking } from '@interfaces/booking.interface';
import { BookingService } from '@services/booking.service';

export class BookingController {
  public BookingService = Container.get(BookingService);

  public getBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllBookingData: Booking[] = await this.BookingService.findAllBooking();

      res.status(200).json({ data: findAllBookingData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getBookingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const BookingId: string = req.params.id;
      const findOneBookingData: Booking = await this.BookingService.findBookingById(BookingId);

      res.status(200).json({ data: findOneBookingData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createBookin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const BookinData: Booking = req.body;
      const createBookingData: Booking = await this.BookingService.createBooking(BookinData);

      res.status(201).json({ data: createBookingData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateBookin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const BookinId: string = req.params.id;
      const BookinData: Booking = req.body;
      const updateBookingData: Booking = await this.BookingService.updateBooking(BookinId, BookinData);

      res.status(200).json({ data: updateBookingData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBookin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const BookingId: string = req.params.id;
      const deleteBookingData: Booking = await this.BookingService.deleteBooking(BookingId);

      res.status(200).json({ data: deleteBookingData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
