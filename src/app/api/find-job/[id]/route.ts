import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import JobModel from "@/models/JobModel";
import mongoose, { Types } from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectDB();

  try {
    const { id } = params;

    let job = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      job = await JobModel.findById(id);
    }

    return NextResponse.json(
      job ?? {
        _id: id,
        userId: new Types.ObjectId(),
        postedAt: "16 Dec",
        startDate: "16 Jan",
        title: "Need a Trustworthy Babysitter",
        location: "Melbourne",
        locationDistance: "11km",
        numberOfChildren: 1,
        workingHours: "8h./Day, ASAP",
        hourlyRate: "$32/h",
        matchPercentage: "98%",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        serviceTags: [
          { key: "smokeFree", label: "Non-smoker" },
          { key: "carDirection", label: "Own transport" },
          { key: "childCare", label: "Exp. with twins/multiples" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch job post", msg: error.message },
      { status: 500 },
    );
  }
}
