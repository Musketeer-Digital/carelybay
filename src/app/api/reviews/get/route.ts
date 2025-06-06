import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ReviewModel from "@/models/ReviewModel";

export async function GET(req: NextRequest) {
  await connectDB();

  const jobId = req.nextUrl.searchParams.get("jobId");

  if (!jobId) {
    return NextResponse.json({ error: "Missing jobId" }, { status: 400 });
  }

  try {
    const reviews = await ReviewModel.find({ jobId }).sort({ createdAt: -1 });

    return NextResponse.json(reviews);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch job reviews", msg: error.message },
      { status: 500 },
    );
  }
}
