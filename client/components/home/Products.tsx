import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import ProductCard from "../products/ProductCard";

const Products = () => {
  return (
    <div>
      <h1> Our Products </h1>
      <h1> Explore Our Products </h1>
      <ProductCard />
    </div>
  );
};

export default Products;
