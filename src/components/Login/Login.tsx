"use client";

import React, { useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { signIn } from "next-auth/react";
import { useLoader } from "@/app/Contexts/LoaderContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const createUser = trpc.user.createUser.useMutation();
  const [emailChecked, setEmailChecked] = useState(false);
  const { data: user } = trpc.user.getIdByEmail.useQuery(
    { email },
    { enabled: emailChecked },
  );

  const { setShowLoader } = useLoader();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    Promise.resolve(setEmailChecked(true));
    try {
      setShowLoader(true);
      if (user) {
        setError("User already exists. Please log in.");
        return;
      }
      await createUser.mutateAsync({ email, password });

      const credentials = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });

      if (credentials?.error) {
        setError("Invalid credentials");
        return;
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg shadow-md w-80 border-2 border-pink-400"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-pink-400">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-2 text-pink-400">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-pink-400">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-md bg-pink-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-pink-400">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-md bg-pink-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-black p-2 rounded-md hover:bg-red-700 transition animate-pulse"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
