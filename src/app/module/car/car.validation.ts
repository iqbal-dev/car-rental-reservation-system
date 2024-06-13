import { z } from 'zod';
import { CAR_FEATURES } from './car.constant';

const createCarValidationSchema = z.object({
  body: z.object({
    // Name of the car
    name: z.string({
      required_error: 'Name is required.',
    }),
    // Description of the car
    description: z.string({
      required_error: 'Description is required.',
    }),
    // Color of the car
    color: z.string({
      required_error: 'Color is required.',
    }),
    // Indicates if the car is electric
    isElectric: z.boolean({
      required_error: 'Electric is required.',
    }),
    // Features of the car (array of strings)
    features: z.array(z.enum([...CAR_FEATURES] as [string, ...string[]])),
    // Rental price per hour
    pricePerHour: z.number({
      required_error: 'Price per hour is required.',
    }),
  }),
});

export const CarValidation = {
  createCarValidationSchema,
};
