"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <>
      <div className="mt-20 top-0 header mb-14 h-auto flex flex-col items-center bg-gradient-to-r from-blue-400 via-gray-400 to-gray-400 h-24 w-full">
        <div className="top-0 absolute left-0">
          <img
            src="/image.png"
            width={100}
            height={100}
            aria-label="Logo"
          ></img>
        </div>
        <h1 className="text-6xl font-bold">E-commerce Mimic</h1>
        <div className="flex flex-row gap-28 text-4xl">
          <button onClick={() => router.push("/items")}>
            <p>View all items</p>
          </button>
          <button onClick={() => router.push("/")}>
            <p>Home</p>
          </button>
          <button onClick={() => router.push("/cart")}>
            <p>View cart</p>
          </button>
          <button onClick={() => router.push("/login")}>
            <p>Login</p>
          </button>
        </div>
      </div>
    </>
  );
}
