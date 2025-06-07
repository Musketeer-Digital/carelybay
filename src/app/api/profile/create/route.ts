import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import UserProfile from "@/models/UserProfile";

export async function POST(req: NextRequest) {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 },
      );
    }
    const profileData = await req.json();

    if (!profileData || Object.keys(profileData).length === 0) {
      return NextResponse.json(
        { error: "Invalid profile data" },
        { status: 400 },
      );
    }

    const newProfile = await UserProfile.create(profileData);
    return NextResponse.json(newProfile, { status: 201 });
  } catch (error: any) {
    console.error("Internal Server Error:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
