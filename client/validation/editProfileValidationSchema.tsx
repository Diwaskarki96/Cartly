import * as yup from "yup";

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
