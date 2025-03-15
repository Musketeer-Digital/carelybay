import mongoose, { Schema, model, Document } from "mongoose";

export interface IServiceExperience extends Document {
  profileId: Schema.Types.ObjectId;
  childCarerType?: string;
  services?: string[];
  skills?: string[];
  ageGroupExperience?: string[];
  createdAt: Date;
  updatedAt?: Date;
}

const ServiceExperienceSchema = new Schema<IServiceExperience>(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      ref: "UserProfile",
      required: true,
    },
    childCarerType: { type: String, default: "" },
    services: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    ageGroupExperience: { type: [String], default: [] },
  },
  { timestamps: true },
);

const ServiceExperience =
  mongoose.models.ServiceExperience ||
  model<IServiceExperience>("ServiceExperience", ServiceExperienceSchema);
export default ServiceExperience;
