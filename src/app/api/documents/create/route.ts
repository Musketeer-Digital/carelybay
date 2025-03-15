import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Documents from "@/models/Documents";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const documentData = await req.json();
    const newDocument = await Documents.create(documentData);

    return NextResponse.json(newDocument, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating document" },
      { status: 500 },
    );
  }
}
