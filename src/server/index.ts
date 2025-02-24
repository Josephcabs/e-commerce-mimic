import { publicProcedure, router } from "./trpc";
import { userRouter } from "./api/routes/user";
import { itemsRouter } from "./api/routes/items";
import { cartRouter } from "./api/routes/cart";

export const appRouter = router({
  hello: publicProcedure.query(() => "Hello from tRPC"),
  user: userRouter,
  items: itemsRouter,
  cart: cartRouter,
});

export type AppRouter = typeof appRouter;
