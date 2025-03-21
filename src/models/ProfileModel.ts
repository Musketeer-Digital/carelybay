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

export interface IDocument {
  fileName: string;
  fileUrl: string;
  fileType: string;
  size: number;
  status: "pending" | "verified" | "rejected";
  uploadedAt: Date;
}

// Main User Profile Interface
export interface IUserProfile extends Document {
  userId?: string;
  firstName?: string;
  lastName?: string;
  personalInfo?: IPersonalInfo;
  servicesExperience?: IServicesExperience;
  availabilityRates?: IAvailabilityRates;
  documents?: IDocument;
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

    servicesExperience: {
      childCarerType: { type: String },
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
        status: {
          type: String,
          enum: ["pending", "verified", "rejected"],
          default: "pending",
        },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

const UserProfile =
  mongoose.models.UserProfile ||
  model<IUserProfile>("UserProfile", ProfileSchema);
export default UserProfile;
