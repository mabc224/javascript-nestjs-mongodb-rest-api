import { restaurantSchema, restaurantDefinition, modelName as restaurantModelName } from './restaurant.schema';
import { restaurantMenuSchema, restaurantMenuDefinition, modelName as restaurantMenuModelName } from './restaurant-menu.schema';

const restaurant = {
  modelName: restaurantModelName,
  definition: restaurantDefinition,
  schema: restaurantSchema,
};

const restaurantMenu = {
  modelName: restaurantMenuModelName,
  definition: restaurantMenuDefinition,
  schema: restaurantMenuSchema,
};

export {
  restaurant,
  restaurantMenu,
};
