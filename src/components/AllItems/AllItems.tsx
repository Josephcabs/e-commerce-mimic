"use client";
import Card from "@mui/joy/Card";
import { Product } from "@prisma/client";
import ItemDialog from "../ItemDialog/ItemDialog";
import { useState } from "react";
import { addToCart } from "@/app/_actions/addToCart";
import { getItems } from "@/app/_actions/getItems";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface AllItemsProps {
  isLoggedIn: boolean;
  items: Product[];
}

export default function AllItems({ isLoggedIn, items }: AllItemsProps) {
  const [itemDialog, setItemDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [itemsToShop, setItemsToShop] = useState<Product[]>(items);
  const [error, setError] = useState("");

  async function addItem(id: number) {
    if (!isLoggedIn) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      toast.error("Failed to add Item to cart");
      setError("Please log in to add items to cart");
      return;
    }
    await addToCart(id);
    setItemsToShop((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    );
    toast.success("Added to cart", {
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
  }

  function openDialog(item: Product) {
    setSelectedItem(item);
    setItemDialog(true);
  }
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = itemsToShop.slice(startIndex, endIndex);
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  return (
    <>
      {error && (
        <div className="bg-gradient-to-r from-red-400 via-pink-400 to-red-400 bg-clip-text text-transparent flex justify-center text-2xl items-center">
          {error}
        </div>
      )}
      <div className="grid grid-cols-4 gap-4">
        {itemDialog && selectedItem && (
          <ItemDialog
            showDialog={itemDialog}
            onClose={() => setItemDialog(false)}
            item={selectedItem}
          />
        )}

        {paginatedItems.map((item) => {
          return (
            <Card
              sx={{ width: "100%", backgroundColor: "pink" }}
              className="h-fit flex justify-center flex-col"
              key={item.id}
            >
              <div className="cursor-pointer" onClick={() => openDialog(item)}>
                <LazyLoadImage
                  src={item.image}
                  className="h-[500px] w-fill object-contain"
                  alt={item.title}
                  loading="lazy"
                  effect="blur"
                />
                <h3>{`${item.rate}/5 rating, ${item.count} reviews`}</h3>
                <div className="flex w-fit justify-center">
                  {item.description}
                </div>
                <div
                  className={item.quantity ? "text-green-500" : "text-red-500"}
                >
                  {item.quantity} left!{" "}
                  {item.quantity ? "In Stock" : "Out Of Stock"}
                </div>
              </div>
              <button
                disabled={!item.quantity}
                onClick={() => addItem(item.id)}
              >
                {!item.quantity ? "Out Of Stock" : "Add To Cart"}
              </button>
            </Card>
          );
        })}
      </div>
      <div className="flex justify-center">
        <Stack spacing={2} className="flex justify-center mt-4">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            classes={{
              ul: "bg-gradient-to-r from-red-400 via-pink-400 to-red-400 w-screen flex justify-center align-center",
            }}
          />
        </Stack>
      </div>
    </>
  );
}
