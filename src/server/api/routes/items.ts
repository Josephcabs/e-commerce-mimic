import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/db";
import { publicProcedure, t } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

export const itemsRouter = t.router({
  getItems: publicProcedure.query(async () => {
    const items = await prisma.product.findMany();
    return items;
  }),

  getItem: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const item = await prisma.product.findUnique({ where: { id: input.id } });
      return item;
    }),

  buyItem: publicProcedure
    .input(
      z.object({
        cartItemId: z.string(),
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const cartItem = await prisma.cartItem.findFirst({
        where: { id: input.cartItemId },
      });
      console.log(cartItem);

      const product = await prisma.product.findFirst({
        where: { id: parseInt(input.id) },
      });

      const session = await getServerSession(authOptions);

      if (!session || !session.user || !session.user.id) {
        return { status: 401, message: "Unauthorized" };
      }

      if (!cartItem && !product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Can not find item",
        });
      }

      if (!cartItem) {
        const cart = await prisma.cart.create({
          data: { userId: session?.user.id },
        });

        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: product.id,
            quantity: 1,
          },
        });
      } else {
        const cart = await prisma.cart.findUnique({
          where: { userId: session?.user.id },
        });

        const existingCartItem = await prisma.cartItem.findFirst({
          where: {
            cartId: cart.id,
            productId: cartItem.productId,
          },
        });

        if (existingCartItem) {
          await prisma.cartItem.update({
            where: { id: existingCartItem.id },
            data: { quantity: existingCartItem.quantity - 1 },
          });
        }

        return { status: 200, message: "Item added to cart successfully" };
      }
    }),

  // getRating: publicProcedure
  // .input(
  //   z.object({
  //     id: z.number(),
  //   })
  // )
  // .query(async ({ input }) => {
  //       return await prisma.product.findUnique({
  //         where: {
  //           id: input.id
  //         },
  //         select: {
  //           rating: true
  //         }
  //       })
  // }),

  // getAllRatings: publicProcedure
  // .query(async () => {
  //   const ratings =  await prisma.rating.findMany();
  //   console.log(ratings);
  //   return ratings;
  // }),
});
