import { model, Schema } from 'mongoose';
import { CAR_FEATURES } from './car.constant';
import { TCar } from './car.interface';

// Define the schema for the car collection
const carSchema = new Schema<TCar>(
  {
    // Name of the car
    name: {
      type: String,
      required: [true, 'Name is required.'], // Name is a required field
    },
    // Description of the car
    description: {
      type: String,
      required: [true, 'Description is required.'], // Description is a required field
    },
    // Color of the car
    color: {
      type: String,
      required: [true, 'Color is required.'], // Color is a required field
    },
    // Indicates if the car is electric
    isElectric: {
      type: Boolean,
      required: [true, 'Electric is required.'], // isElectric is a required field
    },
    // Status of the car (available or unavailable)
    status: {
      type: String,
      enum: ['available', 'unavailable'], // Status can only be 'available' or 'unavailable'
      default: 'available', // Default status is 'available'
    },
    // Features of the car (array of strings)
    features: {
      type: [String],
      enum: CAR_FEATURES,
      required: [true, 'Features is required.'], // Features is a required field
    },
    // Rental price per hour
    pricePerHour: {
      type: Number,
      required: [true, 'Price per hour is required.'], // pricePerHour is a required field
    },
    // Soft delete flag
    isDeleted: {
      type: Boolean,
      default: false, // Default value for isDeleted is false
    },
  },
  {
    // Adds createdAt and updatedAt fields
    timestamps: true,
    // Customize the JSON output
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v; // Remove the __v field from the JSON output
        return ret;
      },
    },
  },
);

const Car = model<TCar>('Car', carSchema);
export default Car;
