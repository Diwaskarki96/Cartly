import React from "react";
import { cn } from "@/lib/utils";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("mx-auto max-w-6xl xl:max-w-7xl px-8 py-6", className)}>
      {children}
    </div>
  );
};

export default Container;
