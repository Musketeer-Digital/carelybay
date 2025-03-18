import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import UserProfile from "@/models/ProfileModel";

export async function POST(req: NextRequest) {
  try {
    // ✅ Ensure MongoDB is connected
    const isConnected = await connectDB();
    if (!isConnected) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 },
      );
    }

    // ✅ Parse incoming request data
    const profileData = await req.json();
    console.log("🔍 Received profile data:", profileData);

    if (!profileData || Object.keys(profileData).length === 0) {
      console.error("❌ Invalid profile data received.");
      return NextResponse.json(
        { error: "Invalid profile data" },
        { status: 400 },
      );
    }

    // ✅ Attempt to create the profile
    const newProfile = await UserProfile.create(profileData);
    console.log("✅ Profile created successfully:", newProfile);

    return NextResponse.json(newProfile, { status: 201 });
  } catch (error: any) {
    console.error("❌ Internal Server Error:", error);

    // ✅ Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
