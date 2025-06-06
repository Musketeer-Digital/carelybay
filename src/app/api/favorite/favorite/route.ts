import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FavoriteModel from "@/models/FavoriteModel";
import mongoose from "mongoose";

export async function PUT(request: Request) {
  try {
    await connectDB();
    const { jobId, userId } = await request.json();

    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      return NextResponse.json(
        {
          success: false,
          isFavorite: false,
          error: "Invalid job ID",
        },
        { status: 400 },
      );
    }

    const existingFavorite = await FavoriteModel.findOne({ jobId, userId });

    if (existingFavorite) {
      await FavoriteModel.deleteOne({ _id: existingFavorite._id });
      return NextResponse.json({
        success: true,
        isFavorite: false,
        message: "Job removed from favorites",
      });
    } else {
      await FavoriteModel.create({ jobId, userId });
      return NextResponse.json({
        success: true,
        isFavorite: true,
        message: "Job added to favorites",
      });
    }
  } catch (error: any) {
    console.error("Error toggling favorite:", error);
    return NextResponse.json(
      {
        success: false,
        isFavorite: false,
        error: "Failed to toggle favorite",
        message: error.message,
      },
      { status: 500 },
    );
  }
}
