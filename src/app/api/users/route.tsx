import { PrismaClient } from "@prisma/client";

export async function GET(request: Request) {
  const prisma = new PrismaClient();
  await prisma.$connect(); // * Make sure server is connected to the database
  const users = await prisma.users.findMany();
  return Response.json(users);
}
