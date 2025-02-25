import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Adjust the import path as needed
import React from "react";

const Breadcrumbs = () => {
  const pathname = usePathname(); // Get the current path
  const pathSegments = pathname.split("/").filter((segment) => segment); // Remove empty parts

  if (pathSegments.length === 0) return null; // Don't show breadcrumbs on the homepage

  return (
    <Breadcrumb className="border-b h-10">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const formattedSegment = segment.replace(/-/g, " ").toUpperCase(); // Convert to readable format

          // Check if the segment is "category" and render it as non-clickable
          const isCategorySegment = segment === "category";

          return (
            <React.Fragment key={path}>
              <BreadcrumbSeparator key={`sep-${path}`} />
              <BreadcrumbItem key={`breadcrumb-${path}`}>
                {index === pathSegments.length - 1 || isCategorySegment ? (
                  <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={path}>{formattedSegment}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
