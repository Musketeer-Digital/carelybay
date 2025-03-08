import { NextRequest, NextResponse } from "next/server";
import { GetSignedUrlConfig, Storage } from "@google-cloud/storage";

export async function POST(req: NextRequest) {
  try {
    const { fileName = "new_image_1" } = await req.json();
    const url = await generateV4UploadSignedUrl(fileName);

    return NextResponse.json({
      url,
      // Add additional headers needed for chunked upload
      headers: {
        "x-goog-resumable": "start",
        "content-type": "application/octet-stream",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error generating signed URL" },
      { status: 500 },
    );
  }
}

async function generateV4UploadSignedUrl(fileName: string) {
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  });

  const options: GetSignedUrlConfig = {
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: "application/octet-stream",
    extensionHeaders: {
      "x-goog-resumable": "start",
    },
  };

  try {
    const [url] = await storage
      .bucket(process.env.BUCKET_NAME || "musketeer-dev-image-assets")
      .file(fileName)
      .getSignedUrl(options);

    console.log("Generated PUT signed URL:", url);
    return url;
  } catch (e) {
    console.error("Error generating signed URL:", e);
    throw e;
  }
}
