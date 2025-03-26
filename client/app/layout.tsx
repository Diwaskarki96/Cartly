import Footer from "@/components/footer/page";
import Container from "@/components/global/Container";
import NavBar from "@/components/navbar/NavBar";
import { QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import ProvidersWrapper from "./ProvidersWrapper";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/components/global/AuthContext";
import SessionWrapper from "./SessionWrapper";
import { Suspense } from "react";
const inter = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cartly - Your Ultimate Online Shopping Destination",
  description:
    "Shop the latest products at unbeatable prices on Cartly. Enjoy seamless shopping with secure payments, fast delivery, and exclusive deals.",
  keywords:
    "Cartly, online shopping, eCommerce, best deals, buy online, fast delivery, secure payments",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <AuthProvider>
            <Providers>
              <ProvidersWrapper>
                <Suspense fallback={<p>Loading data...</p>}>
                  <NavBar />
                  <Container>
                    {children}
                    <ToastContainer position="top-right" autoClose={3000} />
                  </Container>
                  <Footer />
                </Suspense>
              </ProvidersWrapper>
            </Providers>
          </AuthProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
