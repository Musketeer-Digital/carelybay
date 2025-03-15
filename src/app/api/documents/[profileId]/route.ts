import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Documents from "@/models/Documents";

export async function GET(
  req: NextRequest,
  { params }: { params: { profileId: string } },
) {
  await connectDB();

  try {
    const documents = await Documents.find({ profileId: params.profileId });
    return NextResponse.json(documents);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching documents" },
      { status: 500 },
    );
  }
}
