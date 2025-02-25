"use client";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SmartPhone from "@/public/images/banner/smartphone.webp";
import Laptop from "@/public/images/banner/pc.webp";
import Laptop2 from "@/public/images/banner/pc2.webp";
import Laptop3 from "@/public/images/banner/pc3.webp";
import HeroBanner from "@/public/images/banner/HeroBanner (2).png";
import Image from "next/image";
export const HeroCarousel = () => {
  return (
    <Swiper
      className="w-full h-[368px]"
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      //spaceBetween={50}
      slidesPerView={1}
      //navigation
      pagination={{ clickable: true }}
      //   scrollbar={{ draggable: true }}
      //   onSwiper={(swiper) => console.log(swiper)}
      //   onSlideChange={() => console.log("slide change")}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
    >
      <SwiperSlide>
        <div>
          <Image
            // width={800}
            // height={200}
            className="object-cover aspect-[3/1]"
            src={HeroBanner}
            alt="Laptop image"
            priority
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div>
          <Image
            // width={800}
            // height={200}
            className="object-cover w-full "
            src={SmartPhone}
            alt="Laptop image"
            priority
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <Image
          //   width={800}
          //   height={200}
          className="object-cover w-full "
          src={Laptop}
          alt="Laptop image"
          priority
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          //   width={800}
          //   height={200}
          className="object-cover w-full"
          src={Laptop2}
          alt="Laptop image"
          priority
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          //   width={800}
          //   height={200}
          className="object-cover w-full"
          src={Laptop3}
          alt="Laptop image"
          priority
        />
      </SwiperSlide>
    </Swiper>
  );
};
