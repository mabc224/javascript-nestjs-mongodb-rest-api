import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI, { useNewUrlParser: true }),
  ],
})
export default class DatabaseModule {}
