import * as yup from "yup";
export const signinValidation = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be atleast 3 characters.")
    .max(15, "Name must be max 15 characters."),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email")
    .trim(),
  password: yup
    .string()
    .required("Name is required")
    .min(3, "Password must be atleast 3 characters.")
    .max(15, "Password must be max 15 characters."),
  role: yup
    .string()
    .required("Role is required")
    .oneOf(["user", "admin"])
    .default("user"),
});
