import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/db";
import { publicProcedure, t } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

export const cartRouter = t.router({
  getCart: publicProcedure.query(async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User not authenticated",
      });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) return [];

    const updatedProducts = cart.items.map((cartItem) => ({
      id: cartItem.product.id,
      title: cartItem.product.title,
      description: cartItem.product.description,
      image: cartItem.product.image,
      price: cartItem.product.price,
      rate: cartItem.product.rate,
      count: cartItem.product.count,
      quantity: cartItem.quantity,
      cartItemId: cartItem.id,
    }));

    return updatedProducts;
  }),

  addToCart: publicProcedure
    .input(
      z.object({
        productId: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const product = await prisma.product.findUnique({
        where: { id: input.productId },
      });
      const user = await getServerSession(authOptions);
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "You need to sign in",
        });
      }

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Item does not exist",
        });
      }

      if (product.quantity <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Insufficient stock",
        });
      }

      let cart = await prisma.cart.findUnique({
        where: { userId: user.user.id },
      });
      if (!cart) {
        cart = await prisma.cart.create({
          data: {
            user: { connect: { id: user?.user.id } },
            items: {
              create: [
                {
                  product: { connect: { id: product.id } },
                  quantity: 1,
                },
              ],
            },
          },
        });
        await prisma.product.update({
          where: { id: product.id },
          data: { quantity: product.quantity - 1 },
        });
      } else {
        const cartItem = await prisma.cartItem.findFirst({
          where: { cartId: cart.id, productId: product.id },
        });

        if (cartItem) {
          await prisma.product.update({
            where: { id: input.productId },
            data: { quantity: product.quantity - 1 },
          });
          await prisma.cartItem.update({
            where: { id: cartItem.id },
            data: { quantity: cartItem.quantity + 1 },
          });
        } else {
          await prisma.cartItem.create({
            data: {
              cart: { connect: { id: cart.id } },
              product: { connect: { id: product.id } },
              quantity: 1,
            },
          });
        }
      }

      return { status: 200, message: "Product added to cart" };
    }),
});
