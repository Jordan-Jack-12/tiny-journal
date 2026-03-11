import { Prisma } from "@/lib/generated/prisma/client";

export function getJsonObject(data: Prisma.JsonValue) {
    return JSON.parse(JSON.stringify(data, null, 2));
}