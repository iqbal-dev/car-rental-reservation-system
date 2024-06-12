import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';

// Define the user schema
const userSchema = new Schema<TUser>(
  {
    // User's name
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    // User's email address
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
    },
    // User's phone number
    phone: {
      type: String,
      required: [true, 'Phone number is required.'],
      unique: true,
    },
    // User's role (admin or user)
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: [true, 'Role is required.'],
    },
    // User's password (will be hashed before saving)
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    // User's address
    address: {
      type: String,
      required: [true, 'Address is required.'],
    },
  },
  {
    // Automatically include `createdAt` and `updatedAt` timestamps
    timestamps: true,
    // Customize the JSON representation of the document
    toJSON: {
      transform: (doc, ret) => {
        // Remove the __v field before returning the object
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Middleware to hash the password before saving the document
userSchema.pre('save', async function (next) {
  try {
    // Generate a salt with the specified number of rounds
    const salt = await bcrypt.genSalt(config.bcrypt_salt_rounds);
    // Hash the password using the generated salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    // Pass an error message to the next middleware
    next(error as Error);
  }
});

const User = model<TUser>('User', userSchema);

export default User;
