import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsDate } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  public userId: string;

  @IsString()
  @IsNotEmpty()
  public hotelId: string;

  @IsDate()
  @IsNotEmpty()
  public date: Date;
}