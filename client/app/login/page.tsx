import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="w-[1305px] h-[781px] flex  ">
      <div className="w-[805px] h-[781px]">
        <Image
          src="/images/login.png"
          alt="image"
          height={681}
          width={705}
          priority
          // className="h-[600px] w-[800px]"
        />
      </div>
      <div className=" m-auto ">
        <div className="h-[530px] w-[371px] flex flex-col gap-10">
          <h1 className="font-bold text-xl ">Log in to Exclusive</h1>
          <h1 className="">Enter your details</h1>
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button className="w-full">Create Account</Button>
          <h1 className="text-center">
            Already have account?
            <Link href="/signin">
              <span className="underline ml-1">Sign in</span>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
