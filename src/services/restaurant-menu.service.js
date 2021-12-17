import { Dependencies, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { restaurantMenu } from '../schemas';

@Injectable()
@Dependencies(InjectModel(restaurantMenu.modelName))
export default class RestaurantMenuService {
  constructor(restaurantMenuModel) {
    this.RestaurantMenuModel = restaurantMenuModel;

    this.logger = new Logger('restaurant-menu.service');
  }

  /** **********************************
   ********** functions **********
   *********************************** */

  async createRestaurantMenu(request) {
    const createdRestaurantMenu = new this.RestaurantMenuModel(request);
    return createdRestaurantMenu.save();
  }

  async listRestaurantMenus(query = {}, skip = 0, limit = 10, sort = {}) {
    return this.RestaurantMenuModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();
  }

  getRestaurantMenu(query = {}) {
    return this.RestaurantMenuModel.findOne(query).exec();
  }

  async updateRestaurantMenu(query, data) {
    return this.RestaurantMenuModel.findOneAndUpdate(query, data, { new: true }).exec();
  }

  async deleteRestaurantMenu(query) {
    return this.RestaurantMenuModel.deleteOne(query).lean();
  }
}
