import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { HotelRoute } from './routes/hotel.route';
import { BookingRoute } from './routes/booking.route';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new HotelRoute(),new BookingRoute()]);

app.listen();
