import mongoose, { Schema, model, Types } from "mongoose";

export interface ReviewDocument {
  jobId: Types.ObjectId; // Reference to a Job
  reviewerName: string;
  rating: number;
  comment: string;
  avatarUrl?: string;
  childInfo?: string;
  ageGroup?: string;
  petInfo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<ReviewDocument>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "JobModel", required: true },
    reviewerName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    avatarUrl: { type: String },
    childInfo: { type: String },
    ageGroup: { type: String },
    petInfo: { type: String },
  },
  {
    timestamps: true,
  },
);

const ReviewModel =
  mongoose.models?.ReviewModel ||
  model<ReviewDocument>("ReviewModel", ReviewSchema);

export default ReviewModel;
