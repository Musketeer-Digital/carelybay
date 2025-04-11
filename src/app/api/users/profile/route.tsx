import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import UserProfile from "@/models/UserProfile";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = token.sub;
    const rs = await req.formData();
    const file = rs.get("file");
    const firstName = rs.get("firstName")?.toString();
    const lastName = rs.get("lastName")?.toString();
    const dateOfBirth = rs.get("dateOfBirth")?.toString();
    const phone = rs.get("phoneNumber")?.toString();

    if (!file || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const uploadResult = await uploadFileToGCP(file as File);
    const imageUrl = `https://storage.googleapis.com/${process.env.GCP_BUCKET_NAME}/users/${userId}/${process.env.GCP_BUCKET_PROFILE_PHOTOS_DIRECTORY || "profile-photos"}/image`;

    await connectDB();

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId },
      {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        phone,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        image: imageUrl,
      },
      { new: true, upsert: true },
    );

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error updating profile" },
      { status: 500 },
    );
  }
}

async function uploadFileToGCP(file: File) {
  const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    credentials: {
      client_email: process.env.GCP_CLIENT_EMAIL,
      private_key: process.env.GCP_PRIVATE_KEY,
    },
  });
  const bucketName =
    process.env.GCP_BUCKET_NAME || "musketeer-dev-image-assets";

  try {
    const buffer = await file.arrayBuffer();
    return await storage
      .bucket(bucketName)
      .file(
        `${process.env.GCP_BUCKET_PROFILE_PHOTOS_DIRECTORY || "profile-photos"}/${file.name}`,
      )
      .save(Buffer.from(buffer));
  } catch (e) {
    console.error("Error uploading file:", e);
    throw e;
  }
}
