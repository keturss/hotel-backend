import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { Hotel } from '@interfaces/hotel.interface';
import { HotelModel } from '@models/hotel.model';

@Service()
export class HotelService {
  public hotels = HotelModel;
  
  public async findAllHotel(): Promise<Hotel[]> {
    const hotel: Hotel[] = await HotelModel.find();
    return hotel;
  }

  public async findHotelById(HotelId: string): Promise<Hotel> {
    const findHotel: Hotel = await HotelModel.findOne({ _id: HotelId });
    if (!findHotel) throw new HttpException(409, "Hotel doesn't exist");

    return findHotel;
  }

  public async createHotel(HotelData: Hotel): Promise<Hotel> {
    const findHotel: Hotel = await HotelModel.findOne({ name: HotelData.name });
    if (findHotel) throw new HttpException(409, `This name ${HotelData.name} already exists`);

    const createHotelData: Hotel = await HotelModel.create({ ...HotelData});

    return createHotelData;
  }

  public async updateHotel(HotelId: string, HotelData: Hotel): Promise<Hotel> {
    if (HotelData.name) {
      const findHotel: Hotel = await HotelModel.findOne({ name: HotelData.name });
      if (findHotel && findHotel._id != HotelId) throw new HttpException(409, `This name ${HotelData.name} already exists`);
    }

    //TODO UPDATE ALL VALUE

    const updateHotelById: Hotel = await HotelModel.findByIdAndUpdate(HotelId, { HotelData });
    if (!updateHotelById) throw new HttpException(409, "Hotel doesn't exist");

    return updateHotelById;
  }

  public async deleteHotel(HotelId: string): Promise<Hotel> {
    const deleteHotelById: Hotel = await HotelModel.findByIdAndDelete(HotelId);
    if (!deleteHotelById) throw new HttpException(409, "Hotel doesn't exist");

    return deleteHotelById;
  }
}
