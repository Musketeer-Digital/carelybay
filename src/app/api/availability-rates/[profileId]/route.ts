import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AvailabilityRates from "@/models/AvailabilityAndRates";

export async function GET(
  req: NextRequest,
  { params }: { params: { profileId: string } },
) {
  await connectDB();

  try {
    const availability = await AvailabilityRates.findOne({
      profileId: params.profileId,
    });
    return NextResponse.json(availability);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching availability" },
      { status: 500 },
    );
  }
}
