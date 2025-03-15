import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AvailabilityRates from "@/models/AvailabilityAndRates";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const availabilityData = await req.json();
    const newAvailability = await AvailabilityRates.create(availabilityData);

    return NextResponse.json(newAvailability, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating availability" },
      { status: 500 },
    );
  }
}
