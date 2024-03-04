import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Hotel } from '@interfaces/hotel.interface';
import { HotelService } from '@services/hotel.service';

export class HotelController {
  public hotelService = Container.get(HotelService);

  public gethotels = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllHotelData: Hotel[] = await this.hotelService.findAllHotel();

      res.status(200).json({ data: findAllHotelData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getHotelById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hotelId: string = req.params.id;
      const findOneHotelData: Hotel = await this.hotelService.findHotelById(hotelId);

      res.status(200).json({ data: findOneHotelData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hotelData: Hotel = req.body;
      const createHotelData: Hotel = await this.hotelService.createHotel(hotelData);

      res.status(201).json({ data: createHotelData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hotelId: string = req.params.id;
      const hotelData: Hotel = req.body;
      const updateHotelData: Hotel = await this.hotelService.updateHotel(hotelId, hotelData);

      res.status(200).json({ data: updateHotelData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hotelId: string = req.params.id;
      const deleteHotelData: Hotel = await this.hotelService.deleteHotel(hotelId);

      res.status(200).json({ data: deleteHotelData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
