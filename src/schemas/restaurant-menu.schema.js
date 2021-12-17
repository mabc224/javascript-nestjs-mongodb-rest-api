import { Schema } from 'mongoose';

const restaurantMenuDefinition = {
  restaurantId: {
    type: String,
    ref: 'Restaurant',
  },
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
  },
  createdAt: Number,
  updatedAt: Number,
};

const restaurantMenuSchema = new Schema(restaurantMenuDefinition, {
  timestamps: {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    currentTime: () => Math.floor(Date.now() / 1000),
  },
});

const modelName = 'RestaurantMenu';

export {
  restaurantMenuSchema,
  restaurantMenuDefinition,
  modelName,
};
