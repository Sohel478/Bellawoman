import { NextResponse } from "next/server";
import { prisma, getDatabaseUrl } from "@/lib/prisma";
import fs from "fs";

export const dynamic = "force-dynamic";

export async function GET() {
  const dbUrl = getDatabaseUrl();
  const isTurso = dbUrl.startsWith("libsql:");
  const filePath = dbUrl.replace("file:", "");
  const fileExists = isTurso ? true : fs.existsSync(filePath);

  try {
    const [categoryCount, productCount] = await Promise.all([
      prisma.category.count(),
      prisma.product.count(),
    ]);

    return NextResponse.json({
      status: "ok",
      database: {
        provider: isTurso ? "turso-cloud" : "sqlite-local",
        url: isTurso ? dbUrl.replace(/:[^:@]*@/, ":***@") : dbUrl,
        connected: true,
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
          provider: isTurso ? "turso-cloud" : "sqlite-local",
          url: isTurso ? dbUrl.replace(/:[^:@]*@/, ":***@") : dbUrl,
          connected: false,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
