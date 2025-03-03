import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";

export async function POST(req: NextRequest) {
  try {
    const { fileName } = await req.json();
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY,
      },
    });

    const [url] = await storage
      .bucket(process.env.BUCKET_NAME || "")
      .file(fileName)
      .getSignedUrl({
        version: "v4",
        action: "write",
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        contentType: "application/octet-stream",
      });

    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      { error: "Error generating signed URL" },
      { status: 500 },
    );
  }
}
