import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import UserProfile from "@/models/UserProfile";

export async function PATCH(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { ...updatedData } = body;

    if (!updatedData._id) {
      return NextResponse.json(
        { error: "Profile ID is required" },
        { status: 400 },
      );
    }

    const updatedProfile = await UserProfile.findByIdAndUpdate(
      updatedData._id,
      updatedData,
      {
        new: true,
      },
    );

    if (!updatedProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProfile);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error updating profile", msg: error },
      { status: 500 },
    );
  }
}
