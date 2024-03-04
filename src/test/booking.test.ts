import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import { App } from '@/app';
import { CreateBookingDto } from '@dtos/booking.dto';
import { BookingRoute } from '@routes/booking.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
  await mongoose.connection.close();
});

describe('Testing Booking', () => {
  describe('[GET] /booking', () => {
    it('response fineAll booking', async () => {
      const bookingRoute = new BookingRoute();
      const bookings = bookingRoute.bookingController.BookingService.Bookings;

      bookings.find = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeiruty',
          userId: 'qpwoeiruty',
          hotelId: "qpwoeiruty",
          date: "qpwoeiruty"
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([bookingRoute]);
      return request(app.getServer()).get(`${bookingRoute.path}`).expect(200);
    });
  });

  describe('[GET] /booking/:id', () => {
    it('response findOne Booking', async () => {
      const userId = 'qpwoeiruty';

      const bookingRoute = new BookingRoute();
      const bookings = bookingRoute.bookingController.BookingService.Bookings;

      bookings.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        userId: 'qpwoeiruty',
        hotelId: "qpwoeiruty",
        date: "qpwoeiruty"
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([bookingRoute]);
      return request(app.getServer()).get(`${bookingRoute.path}/${userId}`).expect(200);
    });
  });

  describe('[POST] /booking', () => {
    it('response Create Booking', async () => {
      const userData: CreateBookingDto = {
        userId: 'qpwoeiruty',
        hotelId: "qpwoeirutykjbpiubi",
        date: new Date(2024,11,20)
      };

      const bookingRoute = new BookingRoute();
      const bookings = bookingRoute.bookingController.BookingService.Bookings;

      bookings.findOne = jest.fn().mockReturnValue(null);
      bookings.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        userId: userData.userId,
        hotelId: userData.hotelId,
        date: userData.date
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([bookingRoute]);
      return request(app.getServer()).post(`${bookingRoute.path}`).send(userData).expect(400);
    });
  });


  describe('[DELETE] /booking/:id', () => {
    it('response Delete Booking', async () => {
      const userId = '60706478aad6c9ad19a31c84';

      const bookingRoute = new BookingRoute();
      const users = bookingRoute.bookingController.BookingService.Bookings;

      users.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        userId: 'qpwoeiruty',
        hotelId: "qpwoeiruty",
        date: "qpwoeiruty"
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([bookingRoute]);
      return request(app.getServer()).delete(`${bookingRoute.path}/${userId}`).expect(200);
    });
  });
});
