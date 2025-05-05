import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import type { UserProfileDocument } from "@/models/UserProfile";
import UserProfile from "@/models/UserProfile";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

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
    const imageUrl = `https://storage.googleapis.com/${process.env.PUBLIC_BUCKET_NAME || "default-public"}/users/${userId}/${process.env.GCP_BUCKET_PROFILE_PHOTOS_DIRECTORY || "profile-photos"}/image`;

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

export async function PATCH(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = token.sub;
    const data = await req.json();

    // Create update object with only the provided fields
    const updateData: Partial<UserProfileDocument> = {
      ...data,
    };

    // Don't proceed if no fields to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided for update" },
        { status: 400 },
      );
    }

    await connectDB();

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId: new ObjectId(userId) },
      updateData,
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
