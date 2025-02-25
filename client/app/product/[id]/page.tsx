"use client";
import { $axios } from "@/axios/axiosInstance";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import ProductRadioGroup from "@/components/products/ProductRadioGroup";
import { ProductSizeSelector } from "@/components/products/ProductSizeSelector";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { IoAdd } from "react-icons/io5";
import { RiSubtractFill } from "react-icons/ri";
import { FaTruckFast } from "react-icons/fa6";
import { FaRecycle } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  // if (isPending) {
  //   return <Progress />;
  // }
  return (
    <div>
      <Breadcrumbs />
      <div className="w-full flex mt-6 ">
        <div className="w-3/5">image</div>
        <div className="w-2/5">
          <div className="w-full flex gap-4 ">
            <div className="w-full flex flex-col gap-4">
              <p className="font-bold capitalize">{productDetails?.name}</p>
              <div className="flex items-center">
                <p className="">${productDetails?.price}</p>
                {productDetails?.isStock === true ? (
                  <Badge className="bg-green-600 ml-6">In Stock</Badge>
                ) : (
                  <Badge className="bg-red-600 ml-6">Not In Stock</Badge>
                )}
              </div>
              <p className="text-sm ">{productDetails?.description}</p>
              <Separator className="mt-4 bg-muted-foreground " />
              <div className="flex w-full  gap-2">
                <p>Colors:</p>
                <ProductRadioGroup color={productDetails?.color || []} />
              </div>
              <div>
                {productDetails?.size ? (
                  <p className="">
                    Size:<span className="ml-2">{productDetails?.size}</span>
                  </p>
                ) : (
                  []
                )}
              </div>
              <div className="flex">
                <div className="flex items-center rounded-lg border-[1.8px]">
                  <Button size={"icon"}>
                    <RiSubtractFill />
                  </Button>
                  <p className="w-14 text-center">1</p>
                  <Button size={"icon"}>
                    <IoAdd />
                  </Button>
                </div>
                <Button className="ml-10" size={"lg"}>
                  Buy Now
                </Button>
              </div>
              <div className=" rounded border-[1.8px]">
                {productDetails?.freeShipping === true ? (
                  <div className="p-6 border-b-[1.8px]">
                    <div className="flex gap-6">
                      <div className="flex items-center">
                        <FaTruckFast className="text-5xl" />
                      </div>
                      <div>
                        <p className="text-lg">Free Delivery</p>
                        <p className="text-xs underline">
                          Enter your postal code for Delivery Availability
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  []
                )}
                <div className="p-6 flex gap-6">
                  <div className="flex items-center">
                    <FaRecycle className="text-5xl" />
                  </div>
                  <div>
                    <div className="text-lg">Return Delivery</div>
                    <div className="text-xs underline">
                      Free 30 Days Delivery Returns. Details
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
