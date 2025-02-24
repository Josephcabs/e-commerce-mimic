"use server";
import UserCart from "@/components/UserCart/UserCart";
import { getCart } from "../_actions/getCart";

export default async function Cart() {
  const cart = await getCart();

  return (
    <>
      <UserCart
        cart={cart}
        cartItemId={
          cart?.filter((item) => item.quantity > 0)[0]?.cartItemId ?? ""
        }
      />
    </>
  );
}
