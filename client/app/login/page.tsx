"use client";
import { $axios } from "@/axios/axiosInstance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { loginValidation } from "@/validation/loginValidationSchema";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const LoginPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const showToast = (msg: string, type: "success" | "error") => {
    toast({
      description: msg,
      variant: type === "success" ? "default" : "destructive",
      // variant: type, // Assuming your toast component supports a variant prop
    });
  };
  const { isPending, mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values) => {
      return await $axios.post("/user/login", values);
    },
    onSuccess: (res) => {
      const accessToken = res?.data?.token;
      localStorage.setItem("accessToken", accessToken);
      router.push("/");
      showToast(res?.data.msg, "success");
    },
    onError: (error) => {
      console.log(error);
      showToast(error?.response?.data?.msg || "Something went wrong", "error");
    },
  });

  return (
    <div className="w-[1305px] h-[781px] flex  ">
      <div className="w-[805px] h-[781px]">
        <Image
          src="/images/login.png"
          alt="image"
          height={681}
          width={705}
          priority
          // className="h-[600px] w-[800px]"
        />
      </div>
      <div className=" m-auto ">
        {isPending && <p>Loading...</p>}
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
                  <h1 className="font-bold text-xl ">Log in to Exclusive</h1>
                  <h1 className="">Enter your details</h1>
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
                  <Button className="w-full" type="submit" disabled={isPending}>
                    Create Account
                  </Button>
                  <h1 className="text-center">
                    Already have account?
                    <Link href="/signin">
                      <span className="underline ml-1">Sign in</span>
                    </Link>
                  </h1>
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
