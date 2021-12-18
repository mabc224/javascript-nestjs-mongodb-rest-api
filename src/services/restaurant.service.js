import { Dependencies, Injectable, Logger } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { restaurant } from '../schemas';

@Injectable()
@Dependencies(getModelToken(restaurant.modelName))
export default class RestaurantService {
  constructor(restaurantModel) {
    this.RestaurantModel = restaurantModel;

    this.logger = new Logger('restaurant.service');
  }

  /** **********************************
   ********** functions **********
   *********************************** */

  async createRestaurant(request) {
    return this.RestaurantModel.create(request);
  }

  async listRestaurants(query = {}, skip = 0, limit = 10, sort = {}) {
    return this.RestaurantModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();
  }

  getRestaurant(request = {}) {
    return this.RestaurantModel.findOne(request).exec();
  }

  async updateRestaurant(query, data) {
    return this.RestaurantModel.findOneAndUpdate(query, data, { new: true }).exec();
  }

  async deleteRestaurant(query) {
    return this.RestaurantModel.deleteOne(query).lean();
  }

  async countRestaurants(query) {
    return this.RestaurantModel.countDocuments(query);
  }
}
