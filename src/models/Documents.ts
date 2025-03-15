import mongoose, { Schema, model, Document } from "mongoose";

export interface IDocuments extends Document {
  profileId: Schema.Types.ObjectId;
  fileUrl: string;
  verified: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

const DocumentSchema = new Schema<IDocuments>(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      ref: "UserProfile",
      required: true,
    },
    fileUrl: { type: String, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Documents =
  mongoose.models.Documents || model<IDocuments>("Documents", DocumentSchema);
export default Documents;
