import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import JobModel from "@/models/JobModel";
const dummyJobs = [
  {
    id: "123",
    name: "Alanna Doe",
    avatar: "/avatar.jpg",
    postedDate: "16 Dec",
    startDate: "16 Jan",
    title: "Need a Trustworthy Babysitter",
    location: "Melbourne",
    distance: "11km",
    children: 1,
    time: "8h./Day, ASAP",
    rate: "$32/h",
    match: "98%",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    serviceTags: [
      { key: "smokeFree", label: "Non-smoker" },
      { key: "carDirection", label: "Own transport" },
      { key: "pet", label: "Comfortable with pets" },
      { key: "sick", label: "Willing to care for sick kids" },
      { key: "childCare", label: "Exp. with twins/multiples" },
    ],
  },
  {
    id: "1233",
    name: "Michael Smith",
    avatar: "/avatar2.jpg",
    postedDate: "10 Jan",
    startDate: "20 Jan",
    title: "Looking for Experienced Nanny",
    location: "Sydney",
    distance: "7km",
    children: 2,
    time: "6h./Day, Weekdays",
    rate: "$28/h",
    match: "94%",
    description:
      "We are seeking a caring and reliable nanny for two young children during weekdays.",
    serviceTags: [
      { key: "smokeFree", label: "Non-smoker" },
      { key: "carDirection", label: "Own transport" },
      { key: "pet", label: "Comfortable with pets" },
      { key: "sick", label: "Willing to care for sick kids" },
      { key: "childCare", label: "Exp. with twins/multiples" },
    ],
  },
  {
    id: "1234",
    name: "Emma Johnson",
    avatar: "/avatar3.jpg",
    postedDate: "5 Jan",
    startDate: "15 Jan",
    title: "Part-time Babysitter Needed",
    location: "Brisbane",
    distance: "5km",
    children: 1,
    time: "4h./Day, Afternoons",
    rate: "$25/h",
    match: "89%",
    description:
      "Looking for help in the afternoons with school pickup and light homework supervision.",
    serviceTags: [
      { key: "smokeFree", label: "Non-smoker" },
      { key: "childCare", label: "Exp. with twins/multiples" },
    ],
  },
  {
    id: "1235",
    name: "Sophie Lee",
    avatar: "/avatar4.jpg",
    postedDate: "2 Jan",
    startDate: "10 Jan",
    title: "Weekend Childcare Helper",
    location: "Adelaide",
    distance: "9km",
    children: 3,
    time: "10h./Weekend",
    rate: "$30/h",
    match: "91%",
    description:
      "Need assistance on weekends to help manage three energetic kids. Meals and activities provided.",
    serviceTags: [
      { key: "sick", label: "Willing to care for sick kids" },
      { key: "childCare", label: "Exp. with twins/multiples" },
    ],
  },
  {
    id: "1236",
    name: "Daniel Kim",
    avatar: "/avatar5.jpg",
    postedDate: "12 Jan",
    startDate: "22 Jan",
    title: "Evening Babysitter Wanted",
    location: "Perth",
    distance: "6km",
    children: 1,
    time: "6h./Evening, 3x Week",
    rate: "$27/h",
    match: "95%",
    description:
      "Require a dependable sitter for evenings while parents are working late. Light dinner prep included.",
    serviceTags: [
      { key: "smokeFree", label: "Non-smoker" },
      { key: "carDirection", label: "Own transport" },
      { key: "pet", label: "Comfortable with pets" },
    ],
  },
];
export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const jobs = await JobModel.find().sort({ createdAt: -1 });

    return NextResponse.json(jobs.length ? jobs : dummyJobs);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch job posts", msg: error.message },
      { status: 500 },
    );
  }
}
