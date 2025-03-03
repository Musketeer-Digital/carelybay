import { NextRequest, NextResponse } from "next/server";
import { GetSignedUrlConfig, Storage } from "@google-cloud/storage";

export async function POST(req: NextRequest) {
  try {
    const { fileName } = await req.json();
    const url = await generateV4UploadSignedUrl(fileName);
    
    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      { error: "Error generating signed URL" },
      { status: 500 },
    );
  }
}

async function generateV4UploadSignedUrl(fileName: string) {
// Creates a client
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  });

  // These options will allow temporary uploading of the file with outgoing
  // Content-Type: application/octet-stream header.
  const options: GetSignedUrlConfig = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: 'application/octet-stream',
  };

  // Get a v4 signed URL for uploading file
  const [url] = await storage
    .bucket(process.env.BUCKET_NAME || 'musketeer-dev-image-assets')
    .file(fileName)
    .getSignedUrl(options);

  console.log('Generated PUT signed URL:');
  console.log(url);
  console.log('You can use this URL with any user agent, for example:');
  console.log(
    "curl -X PUT -H 'Content-Type: application/octet-stream' " +
      `--upload-file my-file '${url}'`
  );
}
