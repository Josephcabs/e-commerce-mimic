"use server";

import { apiContext } from "@/server/api";

export async function addToCart(id: number) {
  const api = await apiContext();
  await api.cart.addToCart({ productId: id });
}
