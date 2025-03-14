// 'use client
// import Image from "next/image";
// import React from "react";

// const SigninPage = () => {
//   return (
//     <div className="flex gap-8">
//       <div>
//         <Image
//           src="/images/login.png"
//           alt="image"
//           priority
//           width={1200}
//           height={800}
//           //style={{ width: "100%", height: "auto" }}
//         />
//       </div>
//       <div className=" flex p-2 w-full">
//         <div className="flex flex-col items-end">
//           <h1>Create an Account</h1>
//           <h1>Enter your details</h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SigninPage;
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Formik } from "formik";
import { signinValidation } from "@/validation/signinValidation";
import { useMutation } from "@tanstack/react-query";
import { $axios } from "@/axios/axiosInstance";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { LinearProgress } from "@mui/material";
const SigninPage = () => {
  const { toast } = useToast();
  const showToast = (msg: string, type: "success" | "error") => {
    toast({
      description: msg,
      variant: type === "success" ? "default" : "destructive",
      // variant: type, // Assuming your toast component supports a variant prop
    });
  };

  const router = useRouter();
  const { isPending, mutate } = useMutation({
    mutationKey: ["signin"],
    mutationFn: async (values) => {
      return await $axios.post("/user/register", values);
    },
    onSuccess: (res) => {
      //console.log(res?.data?.msg);
      showToast(res?.data?.msg, "success");
      router.push("/");
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
        {isPending && <LinearProgress />}
        <Formik
          initialValues={{
            email: "",
            password: "",
            firstName: "",
            lastName: "",
          }}
          validationSchema={signinValidation}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {(formik) => {
            return (
              <form
                onSubmit={formik.handleSubmit}
                className="h-[530px] w-[371px] flex flex-col "
              >
                <h1 className="font-bold text-xl  mb-6">Create an Account</h1>
                <h1 className=" mb-6">Enter your details</h1>
                <Input
                  className="dark:bg-muted mb-6"
                  {...formik.getFieldProps("firstName")}
                  type="text"
                  placeholder="First Name"
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <p className="text-xs text-red-600">
                    {formik.errors.firstName}
                  </p>
                ) : null}
                <Input
                  className="dark:bg-muted  mb-6"
                  {...formik.getFieldProps("lastName")}
                  type="text"
                  placeholder="Last Name"
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <p className="text-xs text-red-600">
                    {formik.errors.lastName}
                  </p>
                ) : null}

                <Input
                  className="dark:bg-muted  mb-6"
                  {...formik.getFieldProps("email")}
                  type="email"
                  placeholder="Email"
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-xs text-red-600 ">{formik.errors.email}</p>
                ) : null}
                <Input
                  className="dark:bg-muted  mb-6 "
                  {...formik.getFieldProps("password")}
                  type="password"
                  placeholder="Password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-xs text-red-600 ">
                    {formik.errors.password}
                  </p>
                ) : null}
                <Button
                  type="submit"
                  className="w-full  mb-6"
                  disabled={isPending}
                >
                  Create Account
                </Button>
                <h1 className="text-center">
                  Already have account?
                  <Link href="/login">
                    <span className="underline ml-1">Log in</span>
                  </Link>
                </h1>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SigninPage;
