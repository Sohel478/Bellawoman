import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const settings = await prisma.siteSetting.findMany();
    const map: Record<string, string> = {};
    for (const s of settings) {
      map[s.settingKey] = s.settingValue;
    }
    return NextResponse.json(map);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();

    for (const [key, value] of Object.entries(body)) {
      if (typeof value === "string") {
        await prisma.siteSetting.upsert({
          where: { settingKey: key },
          update: { settingValue: value },
          create: { settingKey: key, settingValue: value },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save settings error:", error);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
