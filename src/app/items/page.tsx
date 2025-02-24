"use server";

import AllItems from "@/components/AllItems/AllItems";
import { getItems } from "../_actions/getItems";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Items() {
  const items = await getItems();

  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="flex flex-col">
        <AllItems isLoggedIn={!!session} items={items} />
      </div>
    </>
  );
}
