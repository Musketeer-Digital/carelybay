import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import UserProfile from "@/models/UserProfile";

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { userId, patch } = await req.json();

    // Check if all required fields are provided
    if (!userId || !patch) {
      return NextResponse.json(
        { success: false, message: "User ID and patch data are required" },
        { status: 403 },
      );
    }

    // Find the user profile by userId
    let userProfile = await UserProfile.findOne({ userId });

    if (userProfile) {
      // Update the existing profile
      Object.assign(userProfile, patch);
      await userProfile.save();
    } else {
      // Create a new profile
      userProfile = await UserProfile.create({ userId, ...patch });
    }

    return NextResponse.json(
      {
        success: true,
        message: "User profile updated successfully",
        profile: userProfile,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
