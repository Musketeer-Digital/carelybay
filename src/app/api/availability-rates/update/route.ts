import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AvailabilityRates from "@/models/AvailabilityAndRates";

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

    const updatedAvailability = await AvailabilityRates.findOneAndUpdate(
      { profileId },
      updatedData,
      { new: true },
    );

    return NextResponse.json(updatedAvailability);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating availability" },
      { status: 500 },
    );
  }
}
