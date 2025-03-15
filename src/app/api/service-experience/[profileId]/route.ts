import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceExperience from "@/models/Serivces";

export async function GET(
  req: NextRequest,
  { params }: { params: { profileId: string } },
) {
  await connectDB();

  try {
    const services = await ServiceExperience.find({
      profileId: params.profileId,
    });
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching service experience" },
      { status: 500 },
    );
  }
}
