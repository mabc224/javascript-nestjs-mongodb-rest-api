import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { restaurant, restaurantMenu } from '../schemas';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI, { useNewUrlParser: true }),
    MongooseModule.forFeature([
      { name: restaurant.modelName, schema: restaurant.schema },
      { name: restaurantMenu.modelName, schema: restaurantMenu.schema },
    ]),
  ],
})
export default class DatabaseModule {}
