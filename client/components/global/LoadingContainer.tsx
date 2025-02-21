import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const LoadingContainer = () => {
  return (
    <div className="w-full flex flex-row gap-6">
      <LoadingProduct />
      <LoadingProduct />
    </div>
  );
};
const LoadingProduct = () => {
  return (
    <Card className="w-[20%] flex flex-col">
      <CardContent className="">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="mt-4 h-4 w-[50%]" />
        <Skeleton className="mt-4 h-4 w-[50%]" />
      </CardContent>
    </Card>
  );
};
export default LoadingContainer;
