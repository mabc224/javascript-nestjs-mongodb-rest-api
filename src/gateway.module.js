import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './middlewares';
import { DatabaseModule } from './modules';
import { RestaurantController, RestaurantMenuController } from './controllers';
import { RestaurantService, RestaurantMenuService } from './services';
import { restaurant, restaurantMenu } from './schemas';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: restaurant.modelName, schema: restaurant.schema },
      { name: restaurantMenu.modelName, schema: restaurantMenu.schema },
    ]),
  ],
  controllers: [
    RestaurantController,
    RestaurantMenuController,
  ],
  providers: [
    Logger,
    RestaurantService,
    RestaurantMenuService,
  ],
})
export default class GatewayModule {
  configure(consumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
