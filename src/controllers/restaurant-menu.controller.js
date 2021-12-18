import {
  Bind, Body,
  Controller, Delete, Dependencies, Get, HttpCode, HttpException, HttpStatus,
  Logger, Param, Post, Put, Query,
} from '@nestjs/common';
import { RestaurantMenuService, RestaurantService } from '../services';

@Controller({
  path: 'restaurants/:restaurantId/menus',
  version: ['0.1'],
})

@Dependencies(RestaurantMenuService, RestaurantService)
export default class RestaurantMenuController {
  constructor(restaurantMenuService, restaurantService) {
    this.restaurantMenuService = restaurantMenuService;
    this.restaurantService = restaurantService;

    this.logger = new Logger('restaurant-menu.controller');
  }

  @Get('/')
  @Bind(Param(), Query())
  async listRestaurantMenus(params, queryParams) {
    const { restaurantId } = params;
    const {
      sortBy = 'createdAt',
      order = 'asc',
    } = queryParams;
    let { page, perPage } = queryParams;

    page = page ? parseInt(page, 10) : 1;
    perPage = perPage ? parseInt(perPage, 10) : 10;

    const ordering = order === 'asc' ? 1 : -1;

    const query = { restaurantId };
    const skip = perPage * (page - 1);
    const limit = perPage;
    const sort = { [sortBy]: ordering };

    const [totalCount, restaurants] = await Promise.all([
      this.restaurantMenuService.countRestaurantMenus(query),
      this.restaurantMenuService.listRestaurantMenus(query, skip, limit, sort),
    ]);

    const totalPages = parseInt(Math.ceil(totalCount / perPage), 10);
    if (totalCount <= perPage) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }

    return {
      menus: restaurants.map((restaurant) => this.getApiRestaurantMenu(restaurant)),
      page,
      perPage,
      totalCount,
    };
  }

  @Post('/')
  @Bind(Param(), Body())
  async createRestaurantMenu(params, body) {
    const { restaurantId } = params;
    const {
      name, picture, price, category,
    } = body;

    const query = {
      _id: restaurantId,
    };
    const restaurantExist = await this.restaurantService.getRestaurant(query);

    if (!restaurantExist) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }

    const createRequest = {
      restaurantId,
      name: this.nameFromApi(name),
      picture,
      price,
      category,
    };

    const restaurant = await this.restaurantMenuService.createRestaurantMenu(createRequest);

    return this.getApiRestaurantMenu(restaurant);
  }

  @Get('/:menuId')
  @Bind(Param())
  async getRestaurantMenu(params) {
    const { restaurantId, menuId } = params;

    const query = {
      _id: menuId,
      restaurantId,
    };
    const restaurant = await this.restaurantMenuService.getRestaurantMenu(query);

    if (!restaurant) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }

    return this.getApiRestaurantMenu(restaurant);
  }

  @Put('/:menuId')
  @Bind(Body(), Param())
  async updateRestaurantMenu(body, params) {
    const { restaurantId, menuId } = params;
    const {
      name, picture, price, category,
    } = body;

    const update = {};

    if (name) {
      update.name = this.nameFromApi(name);
    }
    if (picture) {
      update.picture = picture;
    }
    if (price) {
      update.price = price;
    }
    if (category) {
      update.category = category;
    }
    update.updatedAt = Math.floor(Date.now() / 1000);

    const query = {
      _id: menuId,
      restaurantId,
    };

    let restaurant = await this.restaurantMenuService.getRestaurantMenu(query);

    if (!restaurant) {
      throw new HttpException('Restaurant menu not found', HttpStatus.NOT_FOUND);
    }

    restaurant = await this.restaurantMenuService.updateRestaurantMenu(query, update);

    if (!restaurant) {
      throw new HttpException('Restaurant menu not updated', HttpStatus.NOT_FOUND);
    }

    return this.getApiRestaurantMenu(restaurant);
  }

  @Delete('/:menuId')
  @Bind(Param())
  @HttpCode(204)
  async deleteRestaurantMenu(params) {
    const { restaurantId, menuId } = params;

    const query = {
      _id: menuId,
      restaurantId,
    };
    await this.restaurantMenuService.deleteRestaurantMenu(query);
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

  getApiRestaurantMenu(restaurantMenu) {
    const {
      _id,
      restaurantId,
      name,
      picture,
      price,
      category,
      createdAt,
      updatedAt,
    } = restaurantMenu;

    return {
      _id,
      restaurantId,
      name,
      picture,
      price,
      category,
      createdAt: new Date(createdAt * 1000),
      updatedAt: new Date(updatedAt * 1000),
    };
  }
}
