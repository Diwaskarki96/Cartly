import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "../ui/button";
const Cart = () => {
  return (
    <>
      <Button size="icon">
        <FaShoppingCart />
      </Button>
    </>
  );
};

export default Cart;
