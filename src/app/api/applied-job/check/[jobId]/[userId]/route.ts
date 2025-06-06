import { NextResponse } from "next/server";
import { AppliedJob } from "@/models/AppliedJobModel";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: { jobId: string; userId: string } },
) {
  try {
    await connectDB();

    const { jobId, userId } = params;

    const application = await AppliedJob.findOne({
      jobId: new mongoose.Types.ObjectId(jobId),
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!application) {
      return NextResponse.json(null);
    }

    return NextResponse.json({
      _id: application._id,
      message: application.message,
      status: application.status,
      appliedAt: application.appliedAt,
    });
  } catch (error: any) {
    console.error("Error checking job application:", error);
    return NextResponse.json(
      { error: "Failed to check job application", message: error.message },
      { status: 500 },
    );
  }
}
