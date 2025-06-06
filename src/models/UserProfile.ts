import mongoose, { Schema, model } from "mongoose";

export interface UserProfileDocument {
  userId: string;
  firstName: string;
  lastName: string;
  name: string;
  phone: string;
  image: string;
  dateOfBirth?: Date;
  location?: string;
  locationDistancePreference?: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema = new Schema<UserProfileDocument>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    locationDistancePreference: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const UserProfileModel =
  mongoose.models?.UserProfileModel ||
  model<UserProfileDocument>("UserProfileModel", UserProfileSchema);
export default UserProfileModel;
