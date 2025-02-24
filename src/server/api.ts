// ~/server/api.ts
"server-only";

import { appRouter } from ".";
import { createContext } from "./trpc/context";

export const apiContext = async () => {
  const context = await createContext();
  return appRouter.createCaller(context);
};
