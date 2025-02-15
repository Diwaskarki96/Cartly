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
const SigninPage = () => {
  // usemua
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
        <Formik
          initialValues={{ email: "", password: "", name: "" }}
          validationSchema={signinValidation}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(formik) => {
            return (
              <form
                onSubmit={formik.handleSubmit}
                className="h-[530px] w-[371px] flex flex-col gap-10"
              >
                <h1 className="font-bold text-xl">Create an Account</h1>
                <h1>Enter your details</h1>
                <Input
                  {...formik.getFieldProps("name")}
                  type="text"
                  placeholder="Name"
                />
                {formik.touched.name && formik.errors.name ? (
                  <p>{formik.errors.name}</p>
                ) : null}
                <Input
                  {...formik.getFieldProps("email")}
                  type="email"
                  placeholder="Email"
                />
                {formik.touched.email && formik.errors.email ? (
                  <p>{formik.errors.email}</p>
                ) : null}
                <Input
                  {...formik.getFieldProps("password")}
                  type="password"
                  placeholder="Password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <p>{formik.errors.password}</p>
                ) : null}
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
                <h1 className="text-center">
                  Already have account?
                  <Link href="/login">
                    <span className="underline">Log in</span>
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
