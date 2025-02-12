import * as yup from "yup";

export const productValidation = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be atleast 3 characters.")
    .max(50, "Name must be max 50 characters."),
  description: yup
    .string()
    .required("Description is required")
    .min(3, "Description must be atleast 3 characters.")
    .max(50, "Description must be max 50 characters."),
  price: yup
    .number()
    .required("Price is required")
    .min(1, "Price must be atleast 1."),
  quantity: yup
    .number()
    .required("Quantity is required")
    .min(1, "Quantity must be atleast 1."),
  color: yup
    .string()
    .required("Color is required")
    .oneOf(
      ["Red", "Blue", "Green", "Black", "White", "Yellow"],
      "Invalid color "
    ),
  size: yup.string().oneOf(["xs", "s", "m", "l", "xl"], "Invalid size"),
  isStock: yup.boolean().required("Stock status is required").default(true),
  category: yup
    .string()
    .required("Category is required")
    .oneOf([
      "phones",
      "computer",
      "smartwatch",
      "camera",
      "headphones",
      "gaming",
    ]),
  isFeatured: yup.boolean().required("Featured is required").default(false),
});
