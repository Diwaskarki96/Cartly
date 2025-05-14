"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== undefined) {
      setIsMounted(true);
    }
  }, []);

  if (!isMounted) {
    return <h1>Loading...</h1>;
  }
  return <div className="text-2xl">HomePage</div>;
};

export default Page;
