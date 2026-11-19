import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/db";
import { fetchInstagramMedia } from "@/lib/instagram";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    const token = settings.instagramAccessToken;
    const userId = settings.instagramUserId;

    const result = await fetchInstagramMedia(token, userId, 12);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { connected: false, error: error.message || "Failed to load Instagram feed", items: [] },
      { status: 500 }
    );
  }
}
