import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import DocumentsModel from "@/models/DocumentModel";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;
    const userId = formData.get("userId") as string;

    if (!file || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // replace url with cloude storage
    const fileUrl = `https://dummystorage.com/${file}`; // Replace with actual upload logic
    const newDocument = await DocumentsModel.create({
      userId,
      fileName: file,
      fileUrl,
      fileType: file.type,
      size: file.size,
    });

    return NextResponse.json(newDocument, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error creating document", details: error.message },
      { status: 500 },
    );
  }
}
