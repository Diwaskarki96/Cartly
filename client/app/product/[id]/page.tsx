"use client";
import { $axios } from "@/axios/axiosInstance";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import { Separator } from "@/components/ui/separator";
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
  console.log(productDetails);
  return (
    <div>
      <div>
        <Breadcrumbs />
      </div>
      <div className="w-full flex mt-6">
        <div className="w-[60%]">image</div>
        <div>
          <div className="w-full">
            <div className="w-full">
              <p className="font-bold">{productDetails?.name}</p>
              <div className="flex gap-14 ">
                <p className="">${productDetails?.price}</p>
                {productDetails?.isStock === true ? (
                  <p className="text-xs text-green-600">In Stock</p>
                ) : (
                  <p className="text-xs text-red-600">Not in Stock</p>
                )}
              </div>
              <p className="text-sm">{productDetails?.description}</p>
              <Separator className="mt-4 bg-black dark:bg-red-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
