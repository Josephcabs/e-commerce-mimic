"use client";
import { buyItem } from "@/app/_actions/buyItem";
import { CartType } from "@/app/_actions/getCart";
import { useLoader } from "@/app/Contexts/LoaderContext";
import Card from "@mui/joy/Card";
import { useState } from "react";
import toast from "react-hot-toast";

interface UserCartProps {
  cart: CartType[];
  cartItemId: string;
}

export default function UserCart({ cart, cartItemId }: UserCartProps) {
  const [userCart, setUserCart] = useState<CartType[]>(cart);
  const { setShowLoader } = useLoader();
  const buyCartItem = async (id: number, cartItemId: string) => {
    try {
      setShowLoader(true);

      await buyItem(id.toString(), cartItemId);
      setUserCart(userCart.filter((item) => item.id !== id));
      toast.success("Item has successfully been bought", {
        duration: 2000,
        iconTheme: {
          primary: "#fff",
          secondary: "#FFC0CB",
        },
        style: {
          borderRadius: "10px",
          background: "#FFC0CB",
          color: "#fff",
        },
      });
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setShowLoader(false);
    }
  };
  return (
    <div>
      {userCart &&
        userCart?.map((item) => {
          if (!item) {
            return <p key={0}>No Data Found</p>;
          }
          if (item.quantity === 0) {
            return;
          }
          return (
            <Card
              sx={{ width: "100%", backgroundColor: "pink" }}
              className="h-fit "
              key={item.id}
            >
              <img
                src={item.image}
                className="h-[500px] w-fill object-contain"
                alt={item.title}
              />
              <h3>{`${item.rate}/5 rating, ${item.count} reviews`}</h3>
              <div className="flex w-fit justify-center">
                {item.description}
              </div>
              <div>You have {item.quantity} in your cart. Click to buy now</div>
              <button onClick={() => buyCartItem(item.id, cartItemId ?? "")}>
                Buy Now
              </button>
            </Card>
          );
        })}
    </div>
  );
}
