"use server";

import SpecificItem from "@/components/SpecificItem/SpecificItem";

type ItemProps = {
  params: { id: string };
};

export default async function Item({ params }: ItemProps) {
  const id = await params.id;
  if (!params.id) {
    return <p>No ID provided</p>;
  }
  return <SpecificItem id={id} />;
}
