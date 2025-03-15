import mongoose, { Schema, model, Document } from "mongoose";

export interface IAvailabilityRates extends Document {
  profileId: Schema.Types.ObjectId;
  availableFor?: string[];
  rates?: Record<string, number>;
  availability?: string[];
  createdAt: Date;
  updatedAt?: Date;
}

const AvailabilityRatesSchema = new Schema<IAvailabilityRates>(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      ref: "UserProfile",
      required: true,
    },
    availableFor: { type: [String], default: [] },
    rates: { type: Map, of: Number, default: {} },
    availability: { type: [String], default: [] },
  },
  { timestamps: true },
);

const AvailabilityRates =
  mongoose.models.AvailabilityRates ||
  model<IAvailabilityRates>("AvailabilityRates", AvailabilityRatesSchema);
export default AvailabilityRates;
