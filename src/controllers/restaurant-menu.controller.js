import {
  Controller,
  Logger,
} from '@nestjs/common';

@Controller({
  path: 'restaurants/:id',
  version: ['0.1'],
})

export default class RestaurantMenuController {
  constructor() {
    this.logger = new Logger('restaurant-menu.controller');
  }
}
