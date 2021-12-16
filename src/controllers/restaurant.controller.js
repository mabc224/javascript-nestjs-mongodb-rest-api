import {
  Controller,
  Logger,
} from '@nestjs/common';

@Controller({
  path: 'restaurants',
  version: ['0.1'],
})

export default class RestaurantController {
  constructor() {
    this.logger = new Logger('restaurant.controller');
  }
}
