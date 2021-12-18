import { Dependencies, Injectable, Logger } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { restaurantMenu } from '../schemas';

@Injectable()
@Dependencies(getModelToken(restaurantMenu.modelName))
export default class RestaurantMenuService {
  constructor(restaurantMenuModel) {
    this.RestaurantMenuModel = restaurantMenuModel;

    this.logger = new Logger('restaurant-menu.service');
  }

  /** **********************************
   ********** functions **********
   *********************************** */

  async createRestaurantMenu(request) {
    return this.RestaurantMenuModel.create(request);
  }

  async listRestaurantMenus(query = {}, skip = 0, limit = 10, sort = {}) {
    return this.RestaurantMenuModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();
  }

  async getRestaurantMenu(query = {}) {
    return this.RestaurantMenuModel.findOne(query).exec();
  }

  async updateRestaurantMenu(query, data) {
    return this.RestaurantMenuModel.findOneAndUpdate(query, data, { new: true }).exec();
  }

  async deleteRestaurantMenu(query) {
    return this.RestaurantMenuModel.deleteOne(query).lean();
  }

  async countRestaurantMenus(query) {
    return this.RestaurantMenuModel.countDocuments(query);
  }
}
