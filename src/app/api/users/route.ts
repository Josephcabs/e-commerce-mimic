import prisma from "@/lib/db";

export async function GET(request: Request) {
  const users = await prisma.user.findMany({
    where: {
      password: "TestPass1!",
    },
  });
  console.log(users);
  return new Response(JSON.stringify(users));
}
