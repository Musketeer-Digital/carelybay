import {
  IAdditionalInfo,
  IRates,
  IService,
  IServiceAge,
} from "@/utils/profileUtils";
import mongoose, { Schema, model, Document } from "mongoose";

// Separate type definitions for individual properties
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
  childCarerType?: string[];
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
    generalRate?: any;
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

export interface IDocument {
  fileName: string;
  fileUrl: string;
  fileType: string;
  size: number;
  uploadedAt: Date;
}

// Combined UserProfile interface with all functionality
export interface UserProfileDocument extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  name: string;
  phone?: string;
  image?: string;
  personalInfo?: IPersonalInfo;
  servicesExperience?: IServicesExperience;
  availabilityRates?: IAvailabilityRates;
  documents?: IDocument[];
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
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    personalInfo: {
      bio: { type: String, default: "" },
      location: { type: String, default: "" },
      languages: { type: [String], default: [] },
      dateOfBirth: { type: Date },
      qualification: { type: String, default: "" },
      city: { type: String },
      travelingDistance: { type: Number, default: 0 },
    },
    servicesExperience: {
      childCarerType: { type: [String], default: [] },
      services: { type: [Schema.Types.Mixed], default: [] },
      skills: { type: [String], default: [] },
      ageGroupExperience: { type: [Schema.Types.Mixed], default: [] },
      additionalInfo: { type: [Schema.Types.Mixed], default: [] },
    },
    availabilityRates: {
      availableFor: {
        availability: { type: String },
        urgency: { type: String },
      },
      rates: {
        generalRate: { type: Number },
        rates: { type: Schema.Types.Mixed },
      },
      availability: {
        days: { type: [String], default: [] },
        timeSlots: { type: [String], default: [] },
        additionalHours: [
          {
            from: { type: String },
            to: { type: String },
          },
        ],
      },
    },
    documents: [
      {
        fileName: { type: String },
        fileUrl: { type: String },
        fileType: { type: String },
        size: { type: Number },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    locationDistancePreference: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const UserProfile =
  mongoose.models.UserProfile ||
  model<UserProfileDocument>("UserProfile", UserProfileSchema);

export default UserProfile;

// Export legacy interface name for backward compatibility
export type IUserProfile = UserProfileDocument;
