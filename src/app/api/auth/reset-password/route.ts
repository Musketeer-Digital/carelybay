import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import ResetToken from "@/models/ResetToken";
import { mailSender } from "@/lib/mailSender";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 },
      );
    }

    console.log("email", email);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const token = crypto.randomBytes(32).toString("hex");
    const resetToken = new ResetToken({
      email,
      token,
    });
    await resetToken.save();

    const resetLink = `${process.env.FRONTEND_URL}/resetpassword?token=${token}&email=${email}`;
    const emailBody = `
      <h1>Password Reset Request</h1>
      <p>Please click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
    `;

    await mailSender(email, "Password Reset Request", emailBody);

    return NextResponse.json({
      success: true,
      message: "Password reset link sent successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const { email, token, newPassword } = await req.json();

    if (!email || !token || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Email, token, and new password are required",
        },
        { status: 400 },
      );
    }

    const resetToken = await ResetToken.findOne({ email, token });
    if (!resetToken) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    user.password = newPassword; // Ensure to hash the password before saving
    await user.save();
    await resetToken.delete();

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}
