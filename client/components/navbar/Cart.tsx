import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Badge from "@mui/material/Badge";
import { useQuery } from "@tanstack/react-query";
import { $axios } from "@/axios/axiosInstance";
const Cart = ({ openLoginPopup }: { openLoginPopup: () => void }) => {
  const router = useRouter();
  const handleClick = () => {
    const isLoggedIn = localStorage.getItem("accessToken");
    if (isLoggedIn) {
      router.push("/cart");
    } else {
      router.push("/login");
    }
    // else {
    //   openLoginPopup();
    // }
  };
  const { isPending, data } = useQuery({
    queryKey: ["get-cart-item-count"],
    queryFn: async () => {
      return await $axios.get("/cart/cartCount");
    },
    // enabled: userRole === "buyer",
  });
  const cartItemCount = data?.data?.data;

  return (
    <>
      <Badge badgeContent={cartItemCount} color="error">
        <Button size="icon" onClick={handleClick}>
          <FaShoppingCart />
        </Button>
      </Badge>
    </>
  );
};

export default Cart;
