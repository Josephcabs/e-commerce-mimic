import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { TRPCProvider } from "./Providers/providers";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce Mimic",
  description: "Made by Joseph Caballero",
  icons: {},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TRPCProvider>
          <div
            className={`${geistSans.variable} ${geistMono.variable} 
        antialiased flex flex-col items-center 
        justify-center h-24 text-[#666]`}
          >
            <Header />
          </div>
          <div className="overflow-x-clip items-center flex justify-center">
            <Toaster position="bottom-right" />
            {children}
          </div>
        </TRPCProvider>
      </body>
    </html>
  );
}
