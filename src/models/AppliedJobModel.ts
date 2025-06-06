import mongoose, { Document } from "mongoose";

export interface AppliedJobDocument extends Document {
  jobId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  message: string;
  status: "pending" | "accepted" | "rejected";
  appliedAt: Date;
  isFavorite: boolean;
}

const appliedJobSchema = new mongoose.Schema<AppliedJobDocument>(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const AppliedJob =
  mongoose.models.AppliedJob ||
  mongoose.model<AppliedJobDocument>("AppliedJob", appliedJobSchema);
