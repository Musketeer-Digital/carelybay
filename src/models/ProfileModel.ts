import {
  IAdditionalInfo,
  IRates,
  IService,
  IServiceAge,
} from "@/utils/profileUtils";
import mongoose, { Schema, model, Document } from "mongoose";

export interface IPersonalInfo {
  bio?: string;
  location?: string;
  languages?: string[];
  dateOfBirth?: Date;
  qualification?: string;
  city?: string;
  travelingDistance?: number;
}

export interface IServicesExperience {
  childCarerType?: string;
  services?: IService[];
  skills?: string[];
  ageGroupExperience?: IServiceAge[];
  additionalInfo?: IAdditionalInfo[];
}

export interface IAvailabilityRates {
  availableFor?: {
    availability?: string;
    urgency?: string;
  };
  rates?: {
    generalRate?: number;
    rates?: IRates;
  };
  availability?: {
    days: string[];
    timeSlots: string[];
    additionalHours: {
      from: string;
      to: string;
    }[];
  };
}

export interface IDocuments {
  fileUrl?: string;
  verified?: boolean;
}

// Main User Profile Interface
export interface IUserProfile extends Document {
  userId?: string;
  firstName?: string;
  lastName?: string;
  personalInfo?: IPersonalInfo;
  servicesExperience?: IServicesExperience;
  availabilityRates?: IAvailabilityRates;
  documents?: IDocuments;
  createdAt?: Date;
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
      dateOfBirth: { type: Date },
      qualification: { type: String, default: "" },
      city: { type: String },
      travelingDistance: { type: Number, default: 0 },
    },
  },
  { timestamps: true },
);

const UserProfile =
  mongoose.models.UserProfile ||
  model<IUserProfile>("UserProfile", ProfileSchema);
export default UserProfile;
