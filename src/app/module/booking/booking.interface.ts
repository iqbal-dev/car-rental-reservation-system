import { Model, Types } from 'mongoose';

export type TBooking = {
  date: Date;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime?: string;
  totalCost?: number;
};

export interface BookingModel extends Model<TBooking> {
  isCarBooked(carId: Types.ObjectId): Promise<boolean>;
}
