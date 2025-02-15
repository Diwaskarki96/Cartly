import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/page";
import Container from "@/components/global/Container";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProvidersWrapper from "./ProvidersWrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cartly - Your Ultimate Online Shopping Destination",
  description:
    "Shop the latest products at unbeatable prices on Cartly. Enjoy seamless shopping with secure payments, fast delivery, and exclusive deals.",
  keywords:
    "Cartly, online shopping, eCommerce, best deals, buy online, fast delivery, secure payments",
};
const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ProvidersWrapper>
            <NavBar />
            <Container className="">{children}</Container>
            <Footer />
          </ProvidersWrapper>
        </Providers>
      </body>
    </html>
  );
}
