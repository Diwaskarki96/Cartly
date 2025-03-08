import * as yup from "yup";

export const registrationValidation = yup.object({
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
    .required("Name is required")
    .min(3, "Password must be atleast 3 characters.")
    .max(15, "Password must be max 15 characters."),
  role: yup
    .string()
    .required("Role is required")
    .oneOf(["user", "admin"])
    .default("user"),
});
export const loginValidation = yup.object({
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
});
export const editProfileValidation = yup.object({
  firstName: yup
    .string()
    .required("First Name is required")
    .min(3, "First Name must be atleast 3 character ")
    .max(15, "First Name must be under 15 charcters")
    .trim()
    .lowercase(),
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(3, "Last Name must be atleast 3 character ")
    .max(15, "Last Name must be under 15 charcters")
    .trim()
    .lowercase(),
  profilePicture: yup.string().nullable(),
});

export const changePasswordValidation = yup.object({
  oldPassword: yup.string().required("Old Password is required"),
  newPassword: yup.string().required("New Password is required"),
});
