"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductCard = ({ name, price, _id }) => {
  const router = useRouter();
  return (
    <div className="flex gap-6 ">
      <Card
        className="h-64 w-[265px] p-0 "
        onClick={() => {
          router.push(`/product/${_id}`);
        }}
      >
        <CardContent>
          <div className="flex justify-center">
            <Image
              src="/images/login.png"
              alt="image"
              height={200}
              width={205}
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
