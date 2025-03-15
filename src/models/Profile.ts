import mongoose, { Schema, model, Document } from "mongoose";

export interface IUserProfile extends Document {
  userId: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  personalInfo: {
    bio?: string;
    location?: string;
    languages?: string[];
    dateOfBirth?: Date;
    qualification?: string;
    city?: string;
    travelingDistance?: number;
  };
  createdAt: Date;
  updatedAt?: Date;
}

const ProfileSchema = new Schema<IUserProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    personalInfo: {
      bio: { type: String, default: "" },
      location: { type: String, default: "" },
      languages: { type: [String], default: [] },
      dateOfBirth: { type: Date, required: true },
      qualification: { type: String, default: "" },
      city: { type: String, required: true },
      travelingDistance: { type: Number, default: 0 },
    },
  },
  { timestamps: true },
);

const UserProfile =
  mongoose.models.UserProfile ||
  model<IUserProfile>("UserProfile", ProfileSchema);
export default UserProfile;
