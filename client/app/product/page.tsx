"use client";
import { $axios } from "@/axios/axiosInstance";
import Breadcrumbs from "@/components/global/Breadcrumbs";
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
  const products = data?.data?.data;
  if (isPending) {
    return <LoadingContainer />;
  }
  return (
    <div className="">
      <div className="my-8">
        <Breadcrumbs />
      </div>
      <h1 className="text-2xl mb-6 mt-4">Products</h1>

      <div className="flex justify-center flex-wrap gap-4 ">
        {products && products.length > 0 ? (
          products.map((product) => {
            return <ProductCard key={product._id} {...product} />;
          })
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
