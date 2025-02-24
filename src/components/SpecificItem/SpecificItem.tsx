"use client";
import { addToCart } from "@/app/_actions/addToCart";
import { trpc } from "@/app/_trpc/client";
import Card from "@mui/joy/Card";

type SpecificItemProps = {
  id: string;
};
export default function SpecificItem({ id }: SpecificItemProps) {
  const num = parseInt(id);
  const { data, isLoading, error } = trpc.items.getItem.useQuery({ id: num });
  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error fetching data: {error.message}</p>;

  if (!data) return <p>No Data Found</p>;
  return (
    <>
      {data && (
        <Card
          sx={{ width: "100%", backgroundColor: "pink" }}
          className="h-fit "
          key={data?.id}
        >
          <img
            src={data.image}
            className="h-[500px] w-fill object-contain"
            alt={data.title}
          />
          <h3>
            {data?.rate}/5 rating, {data?.count}
          </h3>
          <div className="flex w-fit justify-center">{data?.description}</div>
          <button onClick={() => addToCart(data.id)}>Buy Now</button>
        </Card>
      )}
    </>
  );
}
