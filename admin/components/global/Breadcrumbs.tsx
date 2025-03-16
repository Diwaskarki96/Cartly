"use client";

import { Breadcrumbs, Link, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useMemo } from "react";

export default function CustomBreadcrumbs() {
  const pathname = usePathname(); // Get the current route

  // Split the path into an array and remove empty values
  const pathSegments = useMemo(() => {
    return pathname.split("/").filter((segment) => segment !== "");
  }, [pathname]);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{ padding: "10px 20px" }}
    >
      {/* Home Link */}
      <Link
        href="/"
        underline="hover"
        color="inherit"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
        Home
      </Link>

      {/* Dynamic Links */}
      {pathSegments.map((segment, index) => {
        const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;

        return isLast ? (
          <Typography key={url} color="text.primary">
            {segment}
          </Typography>
        ) : (
          <Link key={url} href={url} underline="hover" color="inherit">
            {segment}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
