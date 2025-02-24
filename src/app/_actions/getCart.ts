"use server";
import { apiContext } from "@/server/api";

export interface CartType {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  rate: number;
  count: number;
  quantity: number;
  cartItemId: string;
}
export async function getCart(): Promise<CartType[]> {
  const api = await apiContext();
  const cart = api.cart.getCart();
  return cart;
}
