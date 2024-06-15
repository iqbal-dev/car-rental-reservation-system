import mongoose, { Schema } from 'mongoose';
import { BookingModel, TBooking } from './booking.interface';
// Create the schema corresponding to the document interface
const bookingSChema = new Schema<TBooking, BookingModel>(
  {
    date: { type: Date, required: [true, 'Date is required'] },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User Id is required'],
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
      required: [true, 'Car Id is required'],
    },
    startTime: { type: String, required: [true, 'Start Time is required'] },
    endTime: { type: String, default: null },
    totalCost: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret, options) {
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Static method to check if a carId has an endTime
bookingSChema.statics.isCarBooked = async function (
  carId: string,
): Promise<boolean> {
  const booking = await this.findOne({
    carId,
    endTime: { $exists: true, $eq: null },
  }).exec();
  return !!booking;
};
// Create and export the model
const Booking = mongoose.model<TBooking, BookingModel>(
  'Booking',
  bookingSChema,
);

export default Booking;
