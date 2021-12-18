import RestaurantMenuService from './restaurant-menu.service';

const menu1 = {
  restaurantId: '61bdb75d7edc1106d20d7fd0',
  name: 'Kheer',
  picture: 'url',
  price: 11,
  category: 'sweat',
};

const menu1Db = {
  _id: '61bdd11495a168c4b8be7197',
  restaurantId: '61bdb75d7edc1106d20d7fd0',
  name: 'Kheer',
  picture: 'url',
  price: 11,
  category: 'sweat',
  createdAt: '2021-12-18T12:16:20.000Z',
  updatedAt: '2021-12-18T12:16:20.000Z',
};

describe('RestaurantMenuService', () => {
  let service;
  let modelMock;

  beforeEach(async () => {
    jest.clearAllMocks();
    modelMock = {
      create: jest.fn().mockReturnValue(menu1Db),
    };
    service = new RestaurantMenuService(modelMock);
  });

  it('should create restaurant-menu properly', async () => {
    const result = await service.createRestaurantMenu(menu1);
    expect(modelMock.create).toHaveBeenCalledWith(menu1);
    expect(result).toHaveProperty('_id');
  });
});
