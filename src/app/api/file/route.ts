import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      credentials: {
        client_email: process.env.GCP_CLIENT_EMAIL,
        private_key: process.env.GCP_PRIVATE_KEY,
      },
    });

    // TODO: Pass in userid
    await storage
      .bucket(process.env.PUBLIC_BUCKET_NAME || "default-public")
      .upload(file.name, { destination: "file" });

    return NextResponse.json({ message: "File uploaded successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
