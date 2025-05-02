import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";



export const metadata: Metadata = {
  title: "Quick commerce",
  description: "Created by Jithin George",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
       <UserProvider><CartProvider>{children}</CartProvider></UserProvider> 
        <Toaster position="top-center" reverseOrder={false} />

      </body>
    </html>
  );
}
