import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "path";
import fs from "fs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const DEFAULT_TURSO_URL = "libsql://bellawoman-techflux.aws-ap-south-1.turso.io";
const DEFAULT_TURSO_TOKEN =
  "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTU1ODMxNzgsImlkIjoiMDFhMjExMTgtOWQwMS03MzI1LWJjMWQtNjMwNzJmZjYxZTE3Iiwia2lkIjoiUVVMaGFhUkJ3YVdyM2dIMklCY2pIdEZLOTBnLXk4SEZ4eW1vMUVsSXpnWSIsInJpZCI6Ijc4NjJkYzY1LTRmMDAtNDY3ZS1hZGE0LWQxNjU3ZTg0MGQ0YiJ9.9PN87-pnO7fBW1wA5Av02KxT-61rganYLSjr6zqNyqxJ7P8b9UOSKD1F5-WDd1y-X95aBAKji_3MZBgpQRF2Cw";

export function getDatabaseUrl(): string {
  const tursoUrl =
    process.env.TURSO_DATABASE_URL ||
    (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("libsql:")
      ? process.env.DATABASE_URL
      : DEFAULT_TURSO_URL);

  if (tursoUrl) {
    return tursoUrl;
  }

  const candidates = [
    path.join(process.cwd(), "prisma", "dev.db"),
    path.join(process.cwd(), ".next", "server", "prisma", "dev.db"),
    path.join(__dirname, "..", "..", "prisma", "dev.db"),
    path.resolve("./prisma/dev.db"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return `file:${candidate}`;
    }
  }

  return `file:${path.join(process.cwd(), "prisma", "dev.db")}`;
}

function createPrismaClient(): PrismaClient {
  const tursoUrl =
    process.env.TURSO_DATABASE_URL ||
    (process.env.DATABASE_URL?.startsWith("libsql:")
      ? process.env.DATABASE_URL
      : DEFAULT_TURSO_URL);
  const tursoAuthToken = process.env.TURSO_AUTH_TOKEN || DEFAULT_TURSO_TOKEN;

  if (tursoUrl && tursoAuthToken) {
    const adapter = new PrismaLibSql({
      url: tursoUrl,
      authToken: tursoAuthToken,
    });
    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
