"use client";

import { useLoader } from "@/app/Contexts/LoaderContext";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [data, setData] = useState<Session>();
  const router = useRouter();
  const { setShowLoader } = useLoader();
  useEffect(() => {
    const fetchData = async () => {
      setShowLoader(true);
      const response = await fetch("http://localhost:3000/api/session");
      const data = await response.json();
      setData(data);
      setShowLoader(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="absolute top-0 header mb-0 h-auto flex flex-col items-center bg-gradient-to-r from-red-400 via-pink-400 to-red-400 h-24 w-full">
        {data && (
          <p className="flex absolute right-0 top-0 mr-1 text-xl">
            Welcome {data.user?.email}
          </p>
        )}
        <div className="top-0 absolute left-0">
          <img src="/image.png" width={95} height={95} aria-label="Logo"></img>
        </div>
        <div className="flex flex-row justify-center items-center">
          <h1 className="text-6xl font-bold">E-commerce Mimic</h1>
        </div>
        <div className="flex flex-row gap-28 text-2xl">
          <button onClick={() => router.push("/items")}>
            <p>View all items</p>
          </button>
          <button onClick={() => router.push("/")}>
            <p>Home</p>
          </button>
          <button onClick={() => router.push("/cart")}>
            <p>View cart</p>
          </button>
          <button
            onClick={() => {
              router.push(`${data ? "/profile" : "/login"}`);
            }}
          >
            <p>{data ? "View Profile" : "Login"}</p>
          </button>
          {data && (
            <button
              onClick={() => {
                setShowLoader(true);
                signOut({ callbackUrl: "/login" });
                setShowLoader(false);
              }}
            >
              {" "}
              Sign out
            </button>
          )}
        </div>
      </div>
    </>
  );
}
