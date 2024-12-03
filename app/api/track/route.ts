import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ error: "test 123" }, { status: 200 });
}

export async function POST(request: Request) {
  try {
    // Parse the JSON body from the incoming request
    const body = await request.json();

    // Process the parsed body
    console.log("Request Body:", body);

    // Respond with a success message and echo back the data
    return NextResponse.json({ success: true, data: body }, { status: 200 });
  } catch (error) {
    // Handle errors (e.g., invalid JSON)
    console.error("Error processing request body:", error);

    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
