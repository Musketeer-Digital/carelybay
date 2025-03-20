import mongoose, { Schema, Document } from "mongoose";

export interface IUserProfile extends Document {
  userId: string;
  name?: string;
  bio?: string;
  avatarUrl?: string;
  [key: string]: any; // Allow additional dynamic fields
}

const UserProfileSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String },
    bio: { type: String },
    avatarUrl: { type: String },
    // Additional fields can be added dynamically
  },
  { timestamps: true },
);

export default mongoose.models.UserProfile ||
  mongoose.model<IUserProfile>("UserProfile", UserProfileSchema);
