"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import { $axios } from "@/axios/axiosInstance";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Array of Brave (external) image links
const demoImages = [
  "https://imgs.search.brave.com/3XHCXYZ9M8Q6NZpRorO3By_G__EDpnPbxcGqarL8-HM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTU3/MjkyMjQ1L3Bob3Rv/L2NhbWVyYS1zbHIu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXB0UjIxcEE3Y1JV/VERIbklYd0hmMUs3/VzI3WnpaZ3ZUUEsz/WmJfenp3TkU9",
  "https://imgs.search.brave.com/2Oj6kvkcq9ciU2tVAdHRzYGMUoM14UZVNi3fXH2_gGA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wbGF0/Zm9ybS50aGV2ZXJn/ZS5jb20vd3AtY29u/dGVudC91cGxvYWRz/L3NpdGVzLzIvMjAy/NS8wMy9hbGllbndh/cmUtbW9uaXRvci5q/cGc_cXVhbGl0eT05/MCZzdHJpcD1hbGwm/Y3JvcD0xNi42NjY2/NjY2NjY2NjcsMCw2/Ni42NjY2NjY2NjY2/NjcsMTAwJnc9MjQw/MA",
  "https://imgs.search.brave.com/ixQoCmMPMK_6xV0cTvjCAyP3QQ_8ecCqvp4v2LyS7V8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzgxLzgxLzM1/LzM2MF9GXzU4MTgx/MzU2Nl9lNHl3ZGJr/VFl2eE1iY0RPTDZl/ang1V2NZZHlTUWVa/ai5qcGc",
  "https://imgs.search.brave.com/tgVPPkjT5s-09bZcYgagkp2V3m41HUDCyxorXd64vdQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtZXUuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxNWNLN1Q4VVVM/Ll9BQ19VTDE2NV9T/UjE2NSwxNjVfLmpw/Zw",
  "https://imgs.search.brave.com/wblGtUr-Evr2zoRkmuPy3nnz763UXEV4Qj-yAIX7ppU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9oZWxp/b3MtaS5tYXNoYWJs/ZS5jb20vaW1hZ2Vy/eS9hcnRpY2xlcy8w/MFBycHdURXR2NWhH/TFR6T0RRbERXVC9o/ZXJvLWltYWdlLmZp/bGwuc2l6ZV8yMjB4/MjIwLnYxNzM3NTcy/NTY3LnBuZw",
  "https://imgs.search.brave.com/HS1_ll9ovnI20Mm5PdE49C18mLPmBVXfPZV14d6qdaU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDg2/OTkzMjI4L3Bob3Rv/L3NtYXJ0LXdhdGNo/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1kVktBN1lTVGpu/aHpZQW9ZY3hEd0dF/dVYxOFFWLUstWXVa/Q0FCbmp0OHBFPQ",
];

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
    <div className="container mx-auto">
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
              onClick={() => handleClick(category)}
              className="border border-gray-200 rounded-lg flex justify-center items-center flex-col gap-2 relative group overflow-hidden cursor-pointer"
            >
              <div className="h-[210px] w-full p-1 relative transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={demoImages[index % demoImages.length]} // Using external links
                  alt="Category image"
                  className="h-full w-full object-contain"
                  width={170}
                  height={145}
                  unoptimized // Required for external images
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
    </div>
  );
};

export default ProductByCategory;
