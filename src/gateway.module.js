import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares';
import { DatabaseModule } from './modules';
import { RestaurantController, RestaurantMenuController } from './controllers';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    DatabaseModule,
  ],
  controllers: [
    RestaurantController,
    RestaurantMenuController,
  ],
  providers: [Logger],
})
export default class GatewayModule {
  configure(consumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
