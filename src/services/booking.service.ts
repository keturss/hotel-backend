import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { Booking } from '@interfaces/booking.interface';
import { BookingModel } from '@models/booking.model';

@Service()
export class BookingService {
  public Bookings = BookingModel;

  public async findAllBooking(): Promise<Booking[]> {
    const Booking: Booking[] = await BookingModel.find();
    return Booking;
  }

  public async findBookingById(BookingId: string): Promise<Booking> {
    const findBooking: Booking = await BookingModel.findOne({ _id: BookingId });
    if (!findBooking) throw new HttpException(409, "Booking doesn't exist");

    return findBooking;
  }

  public async createBooking(BookingData: Booking): Promise<Booking> {
    const createBookingData: Booking = await BookingModel.create({ ...BookingData });

    return createBookingData;
  }

  public async updateBooking(BookingId: string, BookingData: Booking): Promise<Booking> {
    const updateBookingById: Booking = await BookingModel.findByIdAndUpdate(BookingId, { BookingData });
    if (!updateBookingById) throw new HttpException(409, "Booking doesn't exist");

    return updateBookingById;
  }

  public async deleteBooking(BookingId: string): Promise<Booking> {
    const deleteBookingById: Booking = await BookingModel.findByIdAndDelete(BookingId);
    if (!deleteBookingById) throw new HttpException(409, "Booking doesn't exist");

    return deleteBookingById;
  }
}
