"use server";
import { apiContext } from "@/server/api";

interface getItemProps {
  id: number;
}
export async function getItem({ id }: getItemProps) {
  const api = await apiContext();
  const item = api.items.getItem({ id });
  return item;
}
