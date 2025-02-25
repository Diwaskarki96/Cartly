"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductCard = ({ name, price, _id, category }) => {
  const router = useRouter();
  return (
    <div className="flex gap-6 group cursor-pointer">
      <div
        className=" p-0 transform group-hover:shadow-xl transition-shadow duration-500 "
        onClick={() => {
          router.push(`/product/${_id}`);
        }}
      >
        <div
          className="flex justify-center  h-[250px] w-full overflow-hidden
          "
        >
          <Image
            className="transform group-hover:scale-110 transition-transform duration-500 object-cover w-full overflow-hidden"
            src="/images/login.png"
            alt="image"
            height={152}
            width={172}
            priority
          />
        </div>
        <p className="capitalize">{name}</p>
        <p className=" capitalize">{category}</p>
        <p className="text-red-400">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
