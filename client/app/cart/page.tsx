"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CartTable } from "@/components/cart/CartTable";
import { useQuery } from "@tanstack/react-query";
import { $axios } from "@/axios/axiosInstance";

const CartPage = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("accessToken");
    if (!isLoggedIn) {
      router.replace("/login"); // Redirect if not logged in
    }
  }, []);
  const { isPending, data } = useQuery({
    queryKey: ["get-cart-item-list"],
    queryFn: () => {
      return $axios.get("/cart/allcart/");
    },
  });
  const cartData = data?.data?.data;
  console.log(cartData);
  return (
    <div>
      {cartData?.length > 0 ? (
        <CartTable cartData={cartData} />
      ) : (
        <p>cart not found</p>
      )}
    </div>
  );
};

export default CartPage;
