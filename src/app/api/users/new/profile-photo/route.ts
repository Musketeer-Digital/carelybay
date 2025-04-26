import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";

export async function POST(req: NextRequest) {
  try {
    const rs = await req.formData();
    const file = rs.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file selected" }, { status: 400 });
    }

    const res = await uploadFileToGCP(file as File);

    return NextResponse.json(res);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error generating signed URL" },
      { status: 500 },
    );
  }
}

async function uploadFileToGCP(file: File) {
  // Creates a client
  const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    credentials: {
      client_email: process.env.GCP_CLIENT_EMAIL,
      private_key: process.env.GCP_PRIVATE_KEY,
    },
  });

  try {
    const buffer = await file.arrayBuffer();
    return await storage
      .bucket(process.env.PUBLIC_BUCKET_NAME || "default-public")
      .file(
        `${process.env.GCP_BUCKET_PROFILE_PHOTOS_DIRECTORY || "profile-photos"}/${file.name}`,
      )
      .save(Buffer.from(buffer));
  } catch (e) {
    console.error("Error uploading file:", e);
    throw e;
  }
}
