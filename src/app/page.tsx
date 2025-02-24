"use client";
import Search from "./ui/Search";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1>Home</h1>
        <h1>I am text</h1>
        <Search placeholder="Search" />
      </div>
    </>
  );
}
