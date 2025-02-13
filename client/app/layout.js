import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cartly - Your Ultimate Online Shopping Destination",
  description:
    "Discover a wide range of products at Cartly, your one-stop online shop for fashion, electronics, home essentials, and more. Enjoy seamless shopping, fast delivery, and exclusive deals. Start exploring now!",
  keywords:
    "online shopping, ecommerce, buy online, fashion, electronics, home essentials, Cartly",
  author: "Cartly Team",
  ogTitle: "Cartly - Your Ultimate Online Shopping Destination",
  ogDescription:
    "Discover a wide range of products at Cartly, your one-stop online shop for fashion, electronics, home essentials, and more. Enjoy seamless shopping, fast delivery, and exclusive deals. Start exploring now!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
