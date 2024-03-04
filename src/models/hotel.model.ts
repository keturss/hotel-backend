import { model, Schema, Document } from 'mongoose';
import { Hotel } from '@interfaces/hotel.interface';

const HotelSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  picture_list: {
    type: String,
    required: true
  }
});

export const HotelModel = model<Hotel & Document>('Hotel', HotelSchema);
