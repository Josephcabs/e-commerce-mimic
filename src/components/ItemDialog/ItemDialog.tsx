"use client";

import { Product } from "@prisma/client";
import Dialogs from "../Dialogs/Dialogs";
import Card from "@mui/joy/Card";
import { useClickOutside } from "@/hooks/useClickOutside";

interface ItemDialog {
  item: Product;
  showDialog: boolean;
  onClose: () => void;
}
export default function ItemDialog({ item, showDialog, onClose }: ItemDialog) {
  const dialogRef = useClickOutside(() => onClose());

  if (!showDialog) {
    return null;
  }

  return (
    <Dialogs onClose={onClose}>
      <Card
        ref={dialogRef}
        sx={{ width: "100%", backgroundColor: "pink" }}
        className="h-fill flex flex-col"
        key={item.id}
      >
        <div className="flex flex-col justify-center items-center">
          <img
            src={item.image}
            className="h-fill w-fill object-contain"
            alt={item.title}
          />
          <h3>{`${item.rate}/5 rating, ${item.count} reviews`}</h3>
          <div className="flex w-fit justify-center">{item.description}</div>
          <div className={item.quantity ? "text-green-500" : "text-red-500"}>
            {item.quantity} left! {item.quantity ? "In Stock" : "Out Of Stock"}
          </div>
          <button>Add To Cart</button>
        </div>
      </Card>
    </Dialogs>
  );
}
