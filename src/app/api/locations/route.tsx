import { NextRequest, NextResponse } from "next/server";
import GCP_PLACES from "@googlemaps/places";

const { PlacesClient } = GCP_PLACES.v1;
export async function GET(req: NextRequest) {
  try {
    const placesClient = new PlacesClient({
      projectId: process.env.GCP_PROJECT_ID,
      credentials: {
        client_email: process.env.GCP_CLIENT_EMAIL,
        private_key: process.env.GCP_PRIVATE_KEY,
      },
    });

    const response = await placesClient.autocompletePlaces({
      input: "AU",
      includedPrimaryTypes: ["locality"],
      includedRegionCodes: ["AU"],
    });

    const places = response[0].suggestions?.map((s: any) => {
      return {
        id: s.placePrediction.placeId,
        name: s.placePrediction.text.text,
      };
    });

    return NextResponse.json({
      status: 200,
      data: places,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error getting locations", data: [] },
      { status: 500 },
    );
  }
}
