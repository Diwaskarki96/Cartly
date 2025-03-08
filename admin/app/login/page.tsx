"use client";
import { Formik } from "formik";
import { useState } from "react";
// import { loginValidationSchema } from "../validationSchema/loginValidationSchema";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { $axios } from "@/axios/axiosInstance";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import {
//   openErrorSnackbar,
//   openSuccessSnackbar,
// } from "../store/slices/snackbarSlice";

const LoginPage = () => {
  // const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  // const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["Login-user"],
    mutationFn: async (values) => {
      return await $axios.post("/admin/login", values);
    },
    onSuccess: (res) => {
      console.log(res);
      // navigate("/home");
      toast.success(res?.data?.msg);
      const firstName = res?.data?.userDetails?.firstName;
      const accessToken = res?.data?.token;
      const role = res?.data?.data?.role;

      // localStorage.setItem("firstName", firstName);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("role", role);
    },
    onError: (error) => {
      // toast.error(error?.response?.data?.msg);
      toast.error("Invalid credentials");
    },
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      {isPending && <LinearProgress />}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10rem",
        }}
      >
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          // validationSchema={loginValidationSchema}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {(formik) => {
            return (
              <div style={{}}>
                <form
                  onSubmit={formik.handleSubmit}
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    display: "flex",

                    flexDirection: "column",
                    padding: "1rem",
                    gap: "1rem",
                    width: "350px",
                  }}
                >
                  <Typography variant="h4">Login</Typography>
                  <FormControl>
                    <TextField
                      label="Email"
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <FormHelperText error>
                        {formik.errors.email}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password" required>
                      Password
                    </InputLabel>
                    <OutlinedInput
                      {...formik.getFieldProps("password")}
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end" required>
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <FormHelperText error>
                        {formik.errors.password}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={isPending}
                  >
                    Login
                  </Button>
                  {/* <Link to={"/register"}>New here? Register</Link> */}
                </form>
              </div>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default LoginPage;
