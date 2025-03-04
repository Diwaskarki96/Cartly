import * as Yup from "yup";

const addProductValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters.")
    .max(50, "Name must be max 50 characters."),
  description: Yup.string()
    .trim()
    .required("Description is required")
    .min(3, "Description must be at least 3 characters.")
    .max(1000, "Description must be max 1000 characters."),
  price: Yup.number()
    .required("Price is required")
    .min(1, "Price must be at least 1."),
  quantity: Yup.number()
    .required("Quantity is required")
    .min(1, "Quantity must be at least 1."),
  // color: Yup.array()
  //   .of(
  //     Yup.string().oneOf(
  //       ["red", "blue", "green", "black", "white", "yellow"],
  //       "Invalid color"
  //     )
  //   )
  //   .required("Color is required"),
  size: Yup.string().trim().oneOf(["xs", "s", "m", "l", "xl"], "Invalid size"),
  isStock: Yup.boolean().required("Stock status is required").default(true),
  category: Yup.string()
    .required("Category is required")
    .trim()
    .oneOf([
      "smartphone",
      "computer",
      "smartwatch",
      "camera",
      "headphone",
      "laptop",
      "gaming",
    ]),
  isFeatured: Yup.boolean().required("Featured is required").default(false),
  freeShipping: Yup.boolean()
    .required("Shipping status is required.")
    .default(true),
});

export default addProductValidationSchema;
