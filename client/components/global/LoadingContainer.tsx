import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const LoadingContainer = () => {
  return (
    <div>
      <LoadingProduct />
      <LoadingProduct />
    </div>
  );
};
const LoadingProduct = () => {
  return (
    <Card className="w-[20%] flex flex-col">
      <CardContent className="">
        <Skeleton className="h-48 w-[100px]" />
        <Skeleton className="h-4 w-[50%]" />
        <Skeleton className="h-4 w-[50%]" />
      </CardContent>
    </Card>
  );
};
export default LoadingContainer;
