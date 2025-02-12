import * as yup from "yup";

export const addToCartValidation = yup.object({
  productId: yup.string().required("Product Id is required"),
  orderQuantity: yup
    .number()
    .required("Order qunatity is required")
    .min(1, "Order quantity must be atleast 1"),
});
