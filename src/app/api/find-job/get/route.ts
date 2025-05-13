import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import JobModel from "@/models/JobModel";
export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const jobs = await JobModel.find().sort({ createdAt: -1 }).lean();
    console.log("JOBS:", JSON.stringify(jobs, null, 2));

    return NextResponse.json(jobs.length ? jobs : []);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch job posts", msg: error.message },
      { status: 500 },
    );
  }
}
