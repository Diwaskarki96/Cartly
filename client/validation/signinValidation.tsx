import * as yup from "yup";
export const signinValidation = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(3, "First name must be atleast 3 characters.")
    .max(15, "First name must be max 15 characters."),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(3, "Last name must be atleast 3 characters.")
    .max(15, "Last name must be max 15 characters."),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email")
    .trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(3, "Password must be atleast 3 characters.")
    .max(15, "Password must be max 15 characters."),
  role: yup
    .string()
    .required("Role is required")
    .oneOf(["user", "admin"])
    .default("user"),
});
