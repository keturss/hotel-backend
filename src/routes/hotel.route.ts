import { Router } from 'express';
import { HotelController } from '@controllers/hotel.controller';
import { CreateHotelDto } from '@dtos/hotel.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import rolesmiddleware from '@/middlewares/roles.middleware';
import Roles from '@/roles/roles';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class HotelRoute implements Routes {
  public path = '/hotel';
  public router = Router();
  public hotelController = new HotelController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.hotelController.gethotels);
    this.router.get(`${this.path}/:id`, this.hotelController.getHotelById);
    this.router.post(
      `${this.path}`,
      [ValidationMiddleware(CreateHotelDto), AuthMiddleware, rolesmiddleware([Roles.ADMIN])],
      this.hotelController.createHotel,
    );
    this.router.put(
      `${this.path}/:id`,
      [ValidationMiddleware(CreateHotelDto, true), AuthMiddleware, rolesmiddleware([Roles.ADMIN])],
      this.hotelController.updateHotel,
    );
    this.router.delete(`${this.path}/:id`, [AuthMiddleware, rolesmiddleware([Roles.ADMIN])], this.hotelController.deleteHotel);
  }
}
