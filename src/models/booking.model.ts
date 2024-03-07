import { model, Schema, Document } from 'mongoose';
import { Booking } from '@interfaces/booking.interface';

const BookingSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  hotelId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const BookingModel = model<Booking & Document>('Booking', BookingSchema);
