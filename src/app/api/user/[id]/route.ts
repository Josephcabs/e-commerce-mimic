import prisma from "@/lib/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return new Response("No id provided", { status: 400 });
  }
  const users = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  console.log(users);
  return new Response(JSON.stringify(users));
}
