import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import UserProfile from "@/models/Profile";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectDB();

  try {
    const profile = await UserProfile.findById(params.id);
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
