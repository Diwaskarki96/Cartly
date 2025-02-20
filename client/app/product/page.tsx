"use client";
import { $axios } from "@/axios/axiosInstance";
import LoadingContainer from "@/components/global/LoadingContainer";
import ProductCard from "@/components/products/ProductCard";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ProductPage = () => {
  const { isPending, data } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      return await $axios.get("/product/allproducts/");
    },
  });
  console.log(data);
  if (isPending) {
    return <LoadingContainer />;
  }
  return (
    <div>
      <h1>Products</h1>
      <ProductCard />
    </div>
  );
};

export default ProductPage;
