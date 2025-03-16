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
    <div>
      <Breadcrumbs />
      <div className="flex mt-7 mb-7 items-center ">
        <div className="w-[20px] h-[40px] rounded bg-[#E4335A]"></div>
        <p className=" text-left text-[#E4335A] ml-6  text-2xl font-bold">
          Products
        </p>
      </div>

      <div className="grid grid-cols-[repeat(2,auto)] sm:grid-cols-[repeat(3,auto)] md:grid-cols-[repeat(4,auto)] lg:grid-cols-[repeat(5,auto)] gap-6  ">
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
