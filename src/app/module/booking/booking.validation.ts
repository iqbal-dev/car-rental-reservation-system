import { Types } from 'mongoose';
import { z } from 'zod';

const timeStringSchema = z.string().refine(
  time => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);
// Define the Zod schema for TBooking
const createBookingSchema = z.object({
  body: z.object({
    date: z.string(),
    carId: z.string(),
    startTime: timeStringSchema,
  }),
});
// Define the Zod schema for TBooking
const queryBookingSchema = z.object({
  query: z.object({
    date: z
      .string()
      .refine(val => /^\d{4}-\d{2}-\d{2}$/.test(val), {
        message: 'Invalid date format, should be YYYY-MM-DD',
      })
      .optional(),
    carId: z
      .string()
      .refine(val => Types.ObjectId.isValid(val), {
        message: 'Invalid Car ID',
      })
      .optional(),
  }),
});

export const BookingValidationSchema = {
  createBookingSchema,
  queryBookingSchema,
};
