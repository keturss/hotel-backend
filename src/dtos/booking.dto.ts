import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  public userId: string;

  @IsString()
  @IsNotEmpty()
  public hotelId: string;

  @IsDateString()
  @IsNotEmpty()
  public date: Date;
}
