import * as yup from "yup";

export const productValidation = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters.")
    .max(50, "Name must be max 50 characters."),
  description: yup
    .string()
    .trim()
    .required("Description is required")
    .min(3, "Description must be at least 3 characters.")
    .max(1000, "Description must be max 1000 characters."),
  price: yup
    .number()
    .required("Price is required")
    .min(1, "Price must be at least 1."),
  quantity: yup
    .number()
    .required("Quantity is required")
    .min(1, "Quantity must be at least 1."),
  // color: yup
  //   .array()
  //   .of(
  //     yup
  //       .string()
  //       .oneOf(
  //         ["red", "blue", "green", "black", "white", "yellow"],
  //         "Invalid color"
  //       )
  //   )
  //   .required("Color is required"),
  size: yup.string().trim().oneOf(["xs", "s", "m", "l", "xl"], "Invalid size"),
  isStock: yup.boolean().required("Stock status is required").default(true),
  category: yup
    .string()
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
  isFeatured: yup.boolean().required("Featured is required").default(false),
  freeShipping: yup
    .boolean()
    .required("Shipping status is required.")
    .default(true),
  productImage: yup
    .string()
    .required("Image is required")
    .default(
      "https://imgs.search.brave.com/yeOvOjjaYfOU4TUMqxEPho3FhjeZkfUxVHBkCcAQt-g/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9ianMu/c2NlbmU3LmNvbS9p/cy9pbWFnZS9ianMv/MzMyNjExPyRianMt/SW5pdGlhbDYwMCQ.jpeg"
    ),
});
