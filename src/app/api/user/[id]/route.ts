import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import UserProfile from "@/models/ProfileModel";

// GET /api/profile/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectDB();

  try {
    const profile = await UserProfile.findOne({ userId: params.id });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Error fetching profile" },
      { status: 500 },
    );
  }
}
