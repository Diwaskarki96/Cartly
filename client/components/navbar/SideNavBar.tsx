"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";

const SideNavBar = ({
  setNav,
}: {
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [nav, setnav] = useState(true);
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  //   const handleNav = () => {
  //     setnav(!nav);
  //   };
  return (
    <div
      className=" lg:hidden "
      ref={modalRef}
      onClick={() => {
        setNav(false);
      }}
    >
      <div className=" w-[60%] h-full bg-[#F8F8F8] flex flex-col pl-5 py-10 z-[1000]">
        <div className="flex items-center justify-between">
          <Link href="/">
            <h1 className="text-3xl font-bold text-muted-foreground p-4 cursor-pointer">
              Cartly
            </h1>
          </Link>
          <div
            className="pr-6"
            onClick={() => {
              setNav(false);
            }}
          >
            <RxCross1 size={30} />
          </div>
        </div>
        <ul className="p-4 flex flex-col gap-4 text-xl">
          <Link href="/">
            <li className="border-b border-gray-600">Home</li>
          </Link>
          <Link href="/product">
            <li className="border-b border-gray-600">Product</li>
          </Link>
          <Link href="/contact">
            <li className="border-b border-gray-600">Contact</li>
          </Link>
          <Link href="/about">
            <li className="border-b border-gray-600">About</li>
          </Link>
          <Link href="/signin">
            <li className="border-b border-gray-600">Sign Up</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideNavBar;
