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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SigninPage = () => {
  return (
    <div className="w-[1305px] h-[781px] flex  ">
      <div className="w-[805px] h-[781px]">
        <Image
          src="/images/login.png"
          alt="image"
          height={781}
          width={805}
          priority
          // className="h-[600px] w-[800px]"
        />
      </div>
      <div className=" m-auto ">
        <div className="h-[530px] w-[371px] flex flex-col gap-10">
          <h1>Create an Account</h1>
          <h1>Enter your details</h1>
          <Input type="text" placeholder="Name" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button className="w-full">Create Account</Button>
          <h1>
            Already have account?
            <Link href="/login">
              <span className="underline">Log in</span>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
