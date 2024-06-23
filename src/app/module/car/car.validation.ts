import { z } from 'zod';

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
    features: z.array(z.string()),
    // Rental price per hour
    pricePerHour: z.number({
      required_error: 'Price per hour is required.',
    }),
  }),
});

const updateCarValidationSchema = z.object({
  body: z.object({
    // Name of the car
    name: z.string().optional(),
    // Description of the car
    description: z.string().optional(),
    // Color of the car
    color: z.string().optional(),
    // Indicates if the car is electric
    isElectric: z.boolean().optional(),
    // Features of the car (array of strings)
    features: z.array(z.string()).optional(),
    // Rental price per hour
    pricePerHour: z.number().optional(),
  }),
});

export const CarValidation = {
  createCarValidationSchema,
  updateCarValidationSchema,
};
