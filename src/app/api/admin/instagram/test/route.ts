import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { fetchInstagramMedia } from "@/lib/instagram";

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { accessToken, userId } = await request.json();

    if (!accessToken || !accessToken.trim()) {
      return NextResponse.json(
        { error: "Please enter an Instagram Access Token to test." },
        { status: 400 }
      );
    }

    const result = await fetchInstagramMedia(accessToken, userId, 6);

    if (!result.connected) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Meta Graph API connection failed.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Connection successful! Fetched ${result.items.length} media items from Meta Graph API.`,
      mediaCount: result.items.length,
      sampleItems: result.items.slice(0, 3),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to test Meta Graph API connection" },
      { status: 500 }
    );
  }
}
