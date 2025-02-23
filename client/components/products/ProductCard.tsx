"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductCard = ({ name, price, _id }) => {
  const router = useRouter();
  return (
    <div className="flex gap-6 group cursor-pointer">
      <Card
        className="h-64 w-[252px] p-0 transform group-hover:shadow-xl transition-shadow duration-500 "
        onClick={() => {
          router.push(`/product/${_id}`);
        }}
      >
        <CardContent>
          <div className="flex justify-center p-2 ">
            <Image
              className="transform group-hover:scale-110 transition-transform duration-500"
              src="/images/login.png"
              alt="image"
              height={180}
              width={190}
              priority
            />
          </div>
          <p>{name}</p>
          <p className="text-red-400">{price}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
