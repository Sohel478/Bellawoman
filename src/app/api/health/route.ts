import { NextResponse } from "next/server";
import { prisma, getDatabaseUrl } from "@/lib/prisma";
import fs from "fs";

export const dynamic = "force-dynamic";

export async function GET() {
  const dbUrl = getDatabaseUrl();
  const filePath = dbUrl.replace("file:", "");
  const fileExists = fs.existsSync(filePath);

  try {
    const [categoryCount, productCount] = await Promise.all([
      prisma.category.count(),
      prisma.product.count(),
    ]);

    return NextResponse.json({
      status: "ok",
      database: {
        url: dbUrl,
        fileExists,
        categories: categoryCount,
        products: productCount,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        error: error.message,
        database: {
          url: dbUrl,
          fileExists,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
