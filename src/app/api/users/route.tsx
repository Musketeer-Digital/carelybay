import { PrismaClient } from "@prisma/client";

export async function GET(request: Request) {
  const prisma = new PrismaClient();
  const users = await prisma.users.findMany();
  return Response.json(users);
}
