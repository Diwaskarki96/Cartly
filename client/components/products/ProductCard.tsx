"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { string } from "yup";
interface ProductCardProps {
  name: string;
  price: number;
  _id: number;
  category: string;
}

const ProductCard = ({ name, price, _id, category }: ProductCardProps) => {
  const router = useRouter();
  return (
    <div className="flex gap-6 group cursor-pointer">
      <div
        className=" p-[6px] transform group-hover:shadow-xl transition-shadow duration-500 rounded-[6px] border"
        onClick={() => {
          router.push(`/product/${_id}`);
        }}
      >
        <div
          className="flex justify-center  h-[300px] w-full overflow-hidden 
          "
        >
          <Image
            className=" rounded-[4px] mb-[6px] transform group-hover:scale-110 transition-transform duration-500 object-cover w-full overflow-hidden"
            src="/images/login.png"
            alt="image"
            height={192}
            width={172}
            priority
          />
        </div>
        <p className="capitalize text-[18px] font-normal">{name}</p>
        {/* <p className=" capitalize text-[15px] font-semibold mb-[6px]">
          {category}
        </p> */}
        <p className="font-bold text-red-400">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
