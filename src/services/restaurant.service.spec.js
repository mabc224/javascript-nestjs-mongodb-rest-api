import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import RestaurantService from './restaurant.service';

const restaurant1 = {
  name: 'restaurant 1-3',
  picture: 'url',
  address: 'lhr',
  openingHours: [{
    dayOfWeek: 1,
    open: 540,
    close: 1041,
  }, {
    dayOfWeek: 2,
    open: 540,
    close: 1040,
  }],
};

const restaurant1Db = {
  _id: '61bdded3568ba47b288cbdf3',
  name: 'restaurant 1-3',
  picture: 'url',
  address: 'lhr',
  openingHours: [
    {
      dayOfWeek: 'Monday',
      open: '09:00 AM',
      close: '05:20 PM',
    },
    {
      dayOfWeek: 'Tuesday',
      open: '09:00 AM',
      close: '05:20 PM',
    },
  ],
  createdAt: '2021-12-18T13:14:59.000Z',
  updatedAt: '2021-12-18T13:14:59.000Z',
};

describe('RestaurantService', () => {
  let service;
  let modelMock;

  beforeEach(async () => {
    jest.clearAllMocks();
    // modelMock = {
    //   create: jest.fn().mockReturnValue(restaurant1Db),
    // };
    // service = new RestaurantService(modelMock);

    const module = await Test.createTestingModule({
      providers: [
        RestaurantService,
        {
          provide: getModelToken('Restaurant'),
          useValue: {
            create: jest.fn().mockReturnValue(restaurant1Db),
          },
        },
      ],
    }).compile();

    modelMock = module.get(getModelToken('Restaurant'));
    service = new RestaurantService(modelMock);
  });

  it('should create restaurant properly', async () => {
    const result = await service.createRestaurant(restaurant1);
    expect(modelMock.create).toHaveBeenCalledWith(restaurant1);
    expect(result).toHaveProperty('_id');
  });
});
