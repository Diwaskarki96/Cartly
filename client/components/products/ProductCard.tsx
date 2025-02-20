import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

const ProductCard = () => {
  return (
    <div className="flex gap-6">
      <Card className="h-64 w-[265px] p-0 ">
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
          <p>Card Content</p>
          <p>price</p>
        </CardContent>
      </Card>
      <Card className="h-64 w-[265px] p-2">
        <CardContent>
          <Image
            src="/images/login.png"
            alt="image"
            height={200}
            width={205}
            priority
          />
          <p>Card Content</p>
          <p>price</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
