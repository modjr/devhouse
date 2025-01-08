import "./globals.css";
import { Navbar } from "@/components/navbar";

import Footer from "@/components/Footer";

export const metadata = {
  title: "DevHouse - Software Solutions",
  description: "High-quality websites and software solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800">
        <Navbar></Navbar>
        <main>{children}</main>
        
      </body>
    </html>
  );
}
