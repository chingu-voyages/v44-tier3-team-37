import { PrismaClient } from "@prisma/client";
import type { Image } from "@prisma/client";

export type { Image };

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (typeof window === "undefined") {
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
}

export default prisma;
