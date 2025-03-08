"use client"; // Mark this as a client component

import { usePathname } from "next/navigation";
import SideNavBar from "@/components/navbar/SideNavBar";
import Container from "@/components/global/Container";
import ProvidersWrapper from "./ProvidersWrapper";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current route
  const isLoginPage = pathname === "/login"; // Check if the current route is the login page

  return (
    <ProvidersWrapper>
      {!isLoginPage && <SideNavBar />} {/* Conditionally render SideNavBar */}
      <Container>{children}</Container>
    </ProvidersWrapper>
  );
}
