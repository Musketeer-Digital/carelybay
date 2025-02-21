import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import OTP from "@/models/OTP";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password, otp } = await req.json();

    // Check if all required fields are provided
    if (!email || !password || !otp) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 403 },
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 },
      );
    }

    // Find the most recent OTP for the email
    const recentOTP = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!recentOTP || otp !== recentOTP.otp) {
      return NextResponse.json(
        { success: false, message: "The OTP is not valid" },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({ email, password: hashedPassword });

    return NextResponse.json(
      { success: true, message: "User registered successfully", user: newUser },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
