import { GetSignedUrlConfig, Storage } from "@google-cloud/storage";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest) {
  try {
    const { fileName = "new_image_1" } = await req.json();

    const url = await generateV4UploadSignedUrl(fileName);

    return NextResponse.json({
      uploadUrl: url,
      headers: {
        "x-goog-resumable": "start",
        "content-type": "application/octet-stream",
      },
    });
  } catch (error) {
    throw Error("Error generating signed URL");
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
    const bucket = storage.bucket(
      process.env.BUCKET_NAME || "musketeer-dev-image-assets",
    );

    await bucket.setCorsConfiguration([
      {
        maxAgeSeconds: 3600,
        method: ["POST", "PUT", "GET"],
        origin: ["*"],
        responseHeader: ["Content-Type"],
      },
    ]);

    const [url] = await bucket.file(fileName).getSignedUrl(options);

    console.log("Generated PUT signed URL:", url);
    return url;
  } catch (e) {
    console.error("Error generating signed URL:", e);
    throw e;
  }
}
