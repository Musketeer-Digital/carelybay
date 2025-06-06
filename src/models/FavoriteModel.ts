import mongoose, { Schema, model, Types } from "mongoose";

export interface FavoriteDocument {
  userId: Types.ObjectId;
  jobId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FavoriteSchema = new Schema<FavoriteDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: Schema.Types.ObjectId, ref: "JobModel", required: true },
  },
  {
    timestamps: true,
  },
);

FavoriteSchema.index({ userId: 1, jobId: 1 }, { unique: true });

const FavoriteModel =
  mongoose.models?.FavoriteModel ||
  model<FavoriteDocument>("FavoriteModel", FavoriteSchema);

export default FavoriteModel;
