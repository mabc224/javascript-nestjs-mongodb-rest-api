import { Schema } from 'mongoose';

const restaurantDefinition = {
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  address: {
    type: String,
  },
  openingHours: [{
    dayOfWeek: Number,
    open: Number,
    close: Number,
  }],
  createdAt: Number,
  updatedAt: Number,
};

const restaurantSchema = new Schema(restaurantDefinition, {
  timestamps: {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    currentTime: () => Math.floor(Date.now() / 1000),
  },
});

const modelName = 'Restaurant';

export {
  restaurantSchema,
  restaurantDefinition,
  modelName,
};
