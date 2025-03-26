"use client"; // Needed for Next.js App Router

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import ProductByCategory from "@/components/home/ProductByCategory";
import { CircularProgress } from "@mui/material";

const Homepage = () => {
  const [count, setCount] = useState(10); // Start with 10 components
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== undefined) {
      setIsMounted(true);
    }
  }, []);

  const { ref, inView } = useInView({
    threshold: 1, // When 100% in view
  });
  // TODO:Loader in everypage (suspense)
  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        setCount((prev) => (prev < 100 ? prev + 10 : prev)); // Load in batches of 10 until 100
      }, 500);
    }
  }, [inView]);
  if (!isMounted) {
    return <CircularProgress />;
  }
  return (
    <>
      <HeroCarousel />
      <ProductByCategory />

      {/* Render FeaturedProducts multiple times */}
      {Array.from({ length: count }).map((_, index) => (
        <FeaturedProducts key={index} />
      ))}

      {/* Empty div to trigger infinite scroll */}
      {count < 100 && (
        <div ref={ref} style={{ height: 50, background: "transparent" }} />
      )}
    </>
  );
};

export default Homepage;
