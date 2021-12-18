import {
  Controller, Dependencies, Bind, Get, Post, Put, Delete,
  Query, Body, Param, HttpCode, HttpException, HttpStatus, Logger,
} from '@nestjs/common';
import RestaurantService from '../services/restaurant.service';

@Controller({
  path: 'restaurants',
  version: ['0.1'],
})

@Dependencies(RestaurantService)
export default class RestaurantController {
  constructor(restaurantService) {
    this.restaurantService = restaurantService;

    this.logger = new Logger('restaurant.controller');
  }

  @Get('/')
  @Bind(Query())
  async listRestaurants(queryParams) {
    const {
      sortBy = 'createdAt',
      order = 'asc',
    } = queryParams;
    let { page, perPage } = queryParams;

    page = page ? parseInt(page, 10) : 1;
    perPage = perPage ? parseInt(perPage, 10) : 10;

    const ordering = order === 'asc' ? 1 : -1;

    const query = {};
    const skip = perPage * (page - 1);
    const limit = perPage;
    const sort = { [sortBy]: ordering };

    const [totalCount, restaurants] = await Promise.all([
      this.restaurantService.countRestaurants(query),
      this.restaurantService.listRestaurants(query, skip, limit, sort),
    ]);

    const totalPages = parseInt(Math.ceil(totalCount / perPage), 10);
    if (totalCount <= perPage) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }

    return {
      restaurants: restaurants.map((restaurant) => this.getApiRestaurant(restaurant)),
      page,
      perPage,
      totalCount,
    };
  }

  @Post('/')
  @Bind(Body())
  async createRestaurant(body) {
    const { name, picture, address } = body;

    const createRequest = {
      name: this.nameFromApi(name),
      picture,
      address,
    };

    const restaurant = await this.restaurantService.createRestaurant(createRequest);

    return this.getApiRestaurant(restaurant);
  }

  @Get('/:restaurantId')
  @Bind(Param())
  async getRestaurant(params) {
    const { restaurantId } = params;

    const query = {
      _id: restaurantId,
    };
    const restaurant = await this.restaurantService.getRestaurant(query);

    if (!restaurant) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }

    return this.getApiRestaurant(restaurant);
  }

  @Put('/:restaurantId')
  @Bind(Body(), Param())
  async updateRestaurant(body, params) {
    const { restaurantId } = params;
    const { name, picture, address } = body;

    const update = {};

    if (name) {
      update.name = this.nameFromApi(name);
    }
    if (picture) {
      update.picture = picture;
    }
    if (address) {
      update.address = address;
    }
    update.updatedAt = Math.floor(Date.now() / 1000);

    const query = {
      _id: restaurantId,
    };

    let restaurant = await this.restaurantService.getRestaurant(query);

    if (!restaurant) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }

    restaurant = await this.restaurantService.updateRestaurant(query, update);

    if (!restaurant) {
      throw new HttpException('Restaurant not updated', HttpStatus.NOT_FOUND);
    }

    return this.getApiRestaurant(restaurant);
  }

  @Delete('/:restaurantId')
  @Bind(Param())
  @HttpCode(204)
  async deleteRestaurant(params) {
    const { restaurantId } = params;

    const query = {
      _id: restaurantId,
    };
    await this.restaurantService.deleteRestaurant(query);
  }

  /** **********************************
   ********** UTILS functions **********
   *********************************** */

  nameFromApi(name) {
    const trimmed = (name || '').trim();
    if (!trimmed.length) {
      throw new HttpException('Invalid value for `name`', HttpStatus.BAD_REQUEST);
    }
    return trimmed;
  }

  getApiRestaurant(restaurant) {
    const {
      _id,
      name,
      picture,
      address,
      createdAt,
      updatedAt,
    } = restaurant;

    return {
      _id,
      name,
      picture,
      address,
      createdAt: new Date(createdAt * 1000),
      updatedAt: new Date(updatedAt * 1000),
    };
  }
}
