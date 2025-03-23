"use client";
import { $axios } from "@/axios/axiosInstance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { loginValidation } from "@/validation/loginValidationSchema";
import { Box, LinearProgress } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa"; // Import the icon
import { useSession, signIn, signOut } from "next-auth/react";
const LoginPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const showToast = (msg: string, type: "success" | "error") => {
    toast({
      description: msg,
      variant: type === "success" ? "default" : "destructive",
    });
  };

  const { isPending, mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values) => {
      return await $axios.post("/user/login", values);
    },
    onSuccess: (res) => {
      const accessToken = res?.data?.token;
      const userID = res?.data?.data?._id;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userID", userID);
      router.push("/");
      queryClient.invalidateQueries(["get-user-details"]);
      showToast(res?.data.msg, "success");
      queryClient.invalidateQueries(["get-cart-item-list"]);
    },
    onError: (error) => {
      console.log(error);
      showToast(error?.response?.data?.msg || "Something went wrong", "error");
    },
  });

  return (
    <div className="w-[1305px] h-[781px] flex">
      <div className="w-[805px] h-[781px]">
        <Image
          src="/images/login.png"
          alt="image"
          height={681}
          width={705}
          priority
        />
      </div>
      <div className="m-auto">
        {isPending && <LinearProgress />}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidation}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {(formik) => {
            return (
              <form onSubmit={formik.handleSubmit}>
                <div className="h-[530px] w-[371px] flex flex-col gap-10">
                  <h1 className="font-bold text-xl">Log in to Exclusive</h1>
                  <h1>Enter your details</h1>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="text-xs text-red-600">
                      {formik.errors.email}
                    </p>
                  ) : null}
                  <Input
                    type="password"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <p className="text-xs text-red-600">
                      {formik.errors.password}
                    </p>
                  ) : null}
                  {/* Wrap Button in a group */}
                  <div className="group">
                    <Button
                      className="w-full relative bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white hover:bg-gradient-to-r hover:from-[#ff4b2b] hover:to-[#ff416c] transition-all duration-300 flex items-center justify-center gap-2"
                      type="submit"
                      disabled={isPending}
                    >
                      Create Account
                      <FaArrowRight className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                    </Button>
                  </div>
                  <h1 className="text-center">
                    Already have an account?
                    <Link href="/signin">
                      <span className="underline ml-1">Sign in</span>
                    </Link>
                  </h1>
                  <Box marginTop={0}>
                    {session ? (
                      <>
                        Signed in as {session.user.email} <br />
                        <button onClick={() => signOut()}>Sign out</button>
                      </>
                    ) : (
                      <>
                        Not signed in <br />
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <button onClick={() => signIn()}>
                            Sign in using Github
                          </button>
                          <button onClick={() => signIn("google")}>
                            Sign in using Google
                          </button>
                        </Box>
                      </>
                    )}
                  </Box>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
