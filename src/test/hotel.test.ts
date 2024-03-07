import mongoose from 'mongoose';
import request from 'supertest';
import { App } from '@/app';
import { CreateHotelDto } from '@dtos/hotel.dto';
import { HotelRoute } from '@routes/hotel.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
  await mongoose.connection.close();
});

describe('Testing Hotels', () => {
  describe('[GET] /hotel', () => {
    it('response findAll Hotel', async () => {
      const hotelsRoute = new HotelRoute();
      const hotels = hotelsRoute.hotelController.hotelService.hotels;

      hotels.find = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeiruty',
          name: 'Ibis_Hotel',
          location: 'Tours',
          description: 'test',
          picture_list: 'azeaze',
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([hotelsRoute]);
      return request(app.getServer()).get(`${hotelsRoute.path}`).expect(200);
    });
  });

  describe('[GET] /hotel/:id', () => {
    it('response find Null Hotel', async () => {
      const userId = 'qpwoeiruty';

      const hotelsRoute = new HotelRoute();
      const users = hotelsRoute.hotelController.hotelService.hotels;

      users.findOne = jest.fn().mockReturnValue(null);

      (mongoose as any).connect = jest.fn();
      const app = new App([hotelsRoute]);
      return request(app.getServer()).get(`${hotelsRoute.path}/${userId}`).expect(409);
    });
  });

  describe('[POST] /hotels', () => {
    it('response Create Hotel Double', async () => {
      const hotelData: CreateHotelDto = {
        name: 'Ibis_Tours',
        location: 'Tours',
        description: 'Test',
        picture_list: 'Ok',
      };

      const hotelsRoute = new HotelRoute();
      const hotels = hotelsRoute.hotelController.hotelService.hotels;

      hotels.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        name: hotelData.name,
        location: hotelData.location,
        description: hotelData.description,
        picture_list: hotelData.picture_list,
      });

      hotels.findOne = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        name: hotelData.name,
        location: hotelData.location,
        description: hotelData.description,
        picture_list: hotelData.picture_list,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([hotelsRoute]);
      return request(app.getServer()).post(`${hotelsRoute.path}`).send(hotelData).expect(404);
    });
  });

  describe('[DELETE] /hotel/:id', () => {
    it('response Delete Hotel not created', async () => {
      const userId = '11116478aad6c9ad19a31c84';

      const hotelsRoute = new HotelRoute();
      const users = hotelsRoute.hotelController.hotelService.hotels;

      users.findOneAndDelete = jest.fn().mockReturnValue(null);

      (mongoose as any).connect = jest.fn();
      const app = new App([hotelsRoute]);
      return request(app.getServer()).delete(`${hotelsRoute.path}/${userId}`).expect(404);
    });
  });
});
