import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
};

// Ensure proper typing for globalThis in a TypeScript environment
declare const globalThis: {
    prisma: ReturnType<typeof prismaClientSingleton> | undefined;
    prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
} & typeof global;

// Singleton instance of PrismaClient
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// Save the PrismaClient instance to `globalThis` in non-production environments
if (process.env.NODE_ENV !== "production") {
    globalThis.prismaGlobal = prisma;
}

export default prisma;
