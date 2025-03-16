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
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Ensure SideNavBar and content are in flex */}
        {!isLoginPage && <SideNavBar />}
        <Container>{children}</Container>
      </div>
    </ProvidersWrapper>
  );
}
