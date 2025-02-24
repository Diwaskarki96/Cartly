"use client";
import { $axios } from "@/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingContainer from "../global/LoadingContainer";
import ProductCard from "../products/ProductCard";
import { Button } from "../ui/button";
import Link from "next/link";

const FeaturedProducts = () => {
  const { isPending, data } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      return await $axios.get("/product/featured");
    },
  });
  const featuredProducts = data?.data?.data;
  if (isPending) {
    return <LoadingContainer />;
  }
  return (
    <div className="flex flex-col">
      <div className="flex mt-7 mb-7 items-center ">
        <div className="w-[20px] h-[40px] rounded bg-[#E4335A]"></div>
        <p className=" text-left text-[#E4335A] ml-6 text-xl font-bold">
          Featured Products
        </p>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-wrap gap-3 ">
          {featuredProducts && featuredProducts.length > 0 ? (
            featuredProducts.slice(0, 4).map((featuredProduct) => {
              return (
                <ProductCard key={featuredProduct._id} {...featuredProduct} />
              );
            })
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
      <Link href={"/product"} className="flex justify-center mt-6">
        <Button size={"lg"}>View All Products</Button>
      </Link>
    </div>
  );
};

export default FeaturedProducts;
