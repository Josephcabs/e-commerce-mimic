// server/trpc/routers/userRouter.ts
import { z } from "zod";
import prisma from "@/lib/db"; // Make sure you have prisma set up properly
import cuid from "cuid";
import { publicProcedure, t } from "@/server/trpc";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const userRouter = t.router({
  getUser: publicProcedure.query(async () => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }),
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const id = cuid();

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error("User already exists");
      }

      const newUser = await prisma.user.create({
        data: { id, email, password },
      });

      return newUser;
    }),

  getUserById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const user = await prisma.user.findUnique({ where: { id } });
      return user;
    }),

  getIdByEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .query(async ({ input }) => {
      const { email } = input;
      const user = await prisma.user.findUnique({ where: { email } });
      return user;
    }),
});
