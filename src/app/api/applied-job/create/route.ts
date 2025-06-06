import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { AppliedJob } from "@/models/AppliedJobModel";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { jobId, message, userId } = await req.json();

    if (!jobId || !message || !userId) {
      return NextResponse.json(
        { error: "Missing required fields: jobId, message, or userId" },
        { status: 400 },
      );
    }

    const alreadyApplied = await AppliedJob.findOne({ jobId, userId });

    if (alreadyApplied) {
      return NextResponse.json(
        { error: "You have already applied to this job" },
        { status: 400 },
      );
    }

    const newApplication = await AppliedJob.create({
      jobId,
      userId,
      message,
    });

    return NextResponse.json(newApplication);
  } catch (error: any) {
    console.error("Error applying to job:", error);
    return NextResponse.json(
      { error: "Failed to apply for job", message: error.message },
      { status: 500 },
    );
  }
}
