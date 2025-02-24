"use server";

import { apiContext } from "@/server/api";
import { Product } from "@prisma/client";

export async function getItems(): Promise<Product[]> {
  const api = await apiContext();
  const items = await api.items.getItems();
  return items;
}
