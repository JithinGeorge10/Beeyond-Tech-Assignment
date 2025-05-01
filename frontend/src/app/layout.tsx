import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';



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
        {children}
        <Toaster position="top-center" reverseOrder={false} />

      </body>
    </html>
  );
}
