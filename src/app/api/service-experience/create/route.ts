import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceExperience from "@/models/Serivces";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const serviceData = await req.json();
    const newService = await ServiceExperience.create(serviceData);

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating service experience" },
      { status: 500 },
    );
  }
}
