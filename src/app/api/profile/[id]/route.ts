import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import UserProfile from "@/models/ProfileModel";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectDB();

  try {
    // Find by userId
    const profile = await UserProfile.findOne({ userId: params.id });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching profile" },
      { status: 500 },
    );
  }
}
