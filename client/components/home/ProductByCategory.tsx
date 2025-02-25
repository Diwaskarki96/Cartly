"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import LaptopPic from "@/public/images/acer.jpg";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import { $axios } from "@/axios/axiosInstance";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";

const ProductByCategory = () => {
  const router = useRouter();
  const { isPending, data } = useQuery({
    queryKey: ["browse-by-category"],
    queryFn: async () => {
      return await $axios.get("/product/category");
    },
  });

  const productCategory = data?.data?.data || [];
  const handleClick = (category) => {
    router.push(`/category/${category}`);
  };
  return (
    <div className="container mx-auto px-4">
      <div className="flex mt-7 mb-7 items-center">
        <div className="w-[20px] h-[40px] rounded bg-[#E4335A]"></div>
        <p className="text-left text-[#E4335A] ml-4 text-base font-bold tracking-wide">
          Categories
        </p>
      </div>
      <p className="text-2xl font-bold mb-7 text-muted-foreground">
        Browse By Category
      </p>
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1280: { slidesPerView: 6, spaceBetween: 30 },
        }}
      >
        {productCategory.map((category: string, index: number) => (
          <SwiperSlide key={index}>
            <div
              // style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              onClick={() => handleClick(category)}
              className="border border-gray-200 rounded-lg flex justify-center items-center flex-col gap-2 relative group overflow-hidden cursor-pointer"
            >
              <div className="h-[210px] w-full p-1 relative transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={LaptopPic}
                  alt="Category image"
                  className="h-full w-full object-contain"
                  width={170}
                  height={145}
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white text-center pb-4 pt-8 transition-all duration-300 group-hover:py-6">
                <span className="text-base font-semibold tracking-wider capitalize drop-shadow-md">
                  {category}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <Separator className="mt-10 border-2 border-gray-300" /> */}
    </div>
  );
};

export default ProductByCategory;
