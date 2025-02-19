import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import OTP from "@/models/OTP";

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email } = await req.json();

    // Check if user is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User is already registered" },
        { status: 401 },
      );
    }

    // Generate OTP (6-digit, only numbers)
    let otp = generateOTP();

    // Ensure OTP is unique
    let existingOTP = await OTP.findOne({ otp });
    while (existingOTP) {
      otp = generateOTP();
      existingOTP = await OTP.findOne({ otp });
    }

    // Save OTP to database
    const otpRecord = await OTP.create({ email, otp });

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("OTP error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}
