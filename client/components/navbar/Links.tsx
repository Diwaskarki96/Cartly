import Link from "next/link";
import React from "react";

const Links = () => {
  return (
    <div className="w-[300px] hidden md:block lg:w-[400px]">
      <ul className="flex  h-full justify-between text-muted-foreground items-center">
        <Link href="/">
          <li>Home</li>
        </Link>
        <Link href="/product">
          <li>Product</li>
        </Link>
        <Link href="contact">
          <li>Contact</li>
        </Link>
        <Link href="about">
          <li>About</li>
        </Link>
        <Link href="signin">
          <li>Sign Up</li>
        </Link>
      </ul>
    </div>
  );
};

export default Links;
