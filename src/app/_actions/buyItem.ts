"use server";
import { apiContext } from "@/server/api";

export async function buyItem(id: string, cartItemId: string) {
  const api = await apiContext();
  await api.items.buyItem({ id, cartItemId });
}
