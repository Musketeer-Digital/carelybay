import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dummyData = [
      { id: 1, message: "Hello, world!" },
      { id: 2, message: "Welcome to the API." },
    ];

    return NextResponse.json({
      status: 200,
      data: dummyData,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error fetching messages", data: [] },
      { status: 500 },
    );
  }
}
