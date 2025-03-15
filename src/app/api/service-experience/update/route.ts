import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceExperience from "@/models/Serivces";

export async function PATCH(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { profileId, ...updatedData } = body;

    if (!profileId) {
      return NextResponse.json(
        { error: "Profile ID is required" },
        { status: 400 },
      );
    }

    const updatedService = await ServiceExperience.findOneAndUpdate(
      { profileId },
      updatedData,
      { new: true },
    );

    return NextResponse.json(updatedService);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating service experience" },
      { status: 500 },
    );
  }
}
