import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import UserProfile from "@/models/Profile";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const profileData = await req.json();
    const newProfile = await UserProfile.create(profileData);

    return NextResponse.json(newProfile, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating profile" },
      { status: 500 },
    );
  }
}
