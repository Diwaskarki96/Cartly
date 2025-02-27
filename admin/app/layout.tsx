import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import SideNavBar from "@/components/SideNavBar";
import Container from "@/components/global/Container";
import ProvidersWrapper from "./ProvidersWrapper";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin",
  description: "Generated by create next app",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <SideNavBar />
        <ProvidersWrapper>
          <Container>{children}</Container>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
