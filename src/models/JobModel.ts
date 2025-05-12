import mongoose, { Schema, model, Types } from "mongoose";

export interface JobPostDocument {
  userId: Types.ObjectId;
  postedAt: string;
  startDate: string;
  title: string;
  location: string;
  locationDistance: string;
  numberOfChildren: number;
  workingHours: string;
  hourlyRate: string;
  matchPercentage: string;
  description: string;
  serviceTags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<JobPostDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postedAt: { type: String, required: true },
    startDate: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    locationDistance: { type: String, required: true },
    numberOfChildren: { type: Number, required: true },
    workingHours: { type: String, required: true },
    hourlyRate: { type: String, required: true },
    matchPercentage: { type: String, required: true },
    description: { type: String, required: true },
    serviceTags: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  },
);

const JobModel =
  mongoose.models?.JobModel || model<JobPostDocument>("JobModel", JobSchema);

export default JobModel;
