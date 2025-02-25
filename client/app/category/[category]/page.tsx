"use client";
import { $axios } from "@/axios/axiosInstance";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import LoadingContainer from "@/components/global/LoadingContainer";
import ProductCard from "@/components/products/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const CategoryPage = () => {
  const params = useParams();
  const categorySlug = params.category;
  const { isPending, data } = useQuery({
    queryKey: ["list-by-category"],
    queryFn: async () => {
      return await $axios.get(`/product/category/${categorySlug}`);
    },
  });
  const productDetails = data?.data?.data || [];
  if (isPending) {
    return <LoadingContainer />;
  }
  return (
    <div>
      <Breadcrumbs />
      <div className="grid grid-cols-[repeat(2,auto)] sm:grid-cols-[repeat(3,auto)] md:grid-cols-[repeat(4,auto)] lg:grid-cols-[repeat(5,auto)] gap-6  mt-6">
        {productDetails.length > 0 ? (
          productDetails.map((product) => {
            return <ProductCard key={product._id} {...product} />;
          })
        ) : (
          <p>No Products found</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
