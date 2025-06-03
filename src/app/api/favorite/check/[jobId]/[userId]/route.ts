import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FavoriteModel from "@/models/FavoriteModel";

export async function GET(
  request: Request,
  { params }: { params: { jobId: string; userId: string } },
) {
  try {
    await connectDB();
    const { jobId, userId } = params;

    const favorite = await FavoriteModel.findOne({ jobId, userId });

    return NextResponse.json({
      success: true,
      isFavorite: Boolean(favorite),
    });
  } catch (error: any) {
    console.error("Error checking favorite status:", error);
    return NextResponse.json(
      {
        success: false,
        isFavorite: false,
        error: "Failed to check favorite status",
        message: error.message,
      },
      { status: 500 },
    );
  }
}
