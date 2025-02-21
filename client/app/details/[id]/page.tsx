"use client";
import { $axios } from "@/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const ProductDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;
  const { isPending, data } = useQuery({
    queryKey: ["get-product-details"],
    queryFn: () => {
      return $axios.get(`product/details/${productId}`);
    },
  });
  const productDetails = data?.data?.data;
  return (
    <div>
      <h1>{productDetails.name}</h1>
    </div>
  );
};

export default ProductDetailPage;
