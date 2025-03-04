import { Formik } from "formik";
import { useRef } from "react";

import { useMutation } from "@tanstack/react-query";
import { $axios } from "@/axios/axiosInstance";
import { loginValidation } from "@/validation/loginValidationSchema";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Define the type for the component props
interface LoginPopupProps {
  onClose: () => void; // Callback function type
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose }) => {
  // Define the type for the modalRef
  const modalRef = useRef<HTMLDivElement>(null);

  // Type the event parameter in closeModal
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && modalRef.current === e.target) {
      onClose(); // Ensure proper casing for the onClose method
    }
  };
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
      showToast(res?.data.msg, "success");
      const accessToken = res?.data?.token;
      localStorage.setItem("accessToken", accessToken);
      router.push("/");
    },
    onError: (error) => {
      console.log(error);
      showToast(error?.response?.data?.msg || "Something went wrong", "error");
    },
  });
  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="h-screen w-full flex justify-center items-center fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-[1000] ease-in-out duration-500"
    >
      <div className="flex h-[500px] w-[700px] relative bg-white">
        <div className="w-[321px] h-full">
          {/* <img src={loginImg} alt="Login" className="w-full h-full" /> */}
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidation}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              {isPending && (
                <h1 className="text-9xl text-red-800">Loading...</h1>
              )}
              <div className="flex justify-center items-center h-full w-[379px]">
                <div className="w-[283px] h-[300px] flex flex-col gap-[48px]">
                  <button
                    onClick={onClose}
                    type="button" // Ensure it's not submitted as a form button
                    className="flex justify-center items-center absolute w-[20px] h-[20px] top-[12px] left-[656px] border-[1px] rounded-[4px] cursor-pointer"
                  >
                    {/* <img src={cross} alt="Close" /> */}
                  </button>
                  {/* <p className="text-[20px] text-center font-extrabold uppercase">
                    Diamond Threading
                  </p> */}

                  <div className="flex flex-col gap-[12px]">
                    <div>
                      <input
                        type="email"
                        placeholder="Email*"
                        className="border-[1px] w-full border-[#EEEEEE] pt-[8px] pb-[8px] pr-[16px] pl-[16px] rounded-xl"
                        {...formik.getFieldProps("email")}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <p className="text-sm text-red-800">
                          {formik.errors.email}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <input
                        type="password"
                        placeholder="Password*"
                        className="border-[1px] w-full border-[#EEEEEE] pt-[8px] pb-[8px] pr-[16px] pl-[16px] rounded-xl"
                        {...formik.getFieldProps("password")}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <p className="text-sm text-red-800">
                          {formik.errors.password}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="flex font-[400] text-[12px] leading-[18px]">
                        <input type="checkbox" />
                        <p className="font-[400] text-[12px] leading-[18px]">
                          Remember me
                        </p>
                      </div>
                      <a
                        href="#"
                        className="underline font-[600] text-[12px] leading-[18px]"
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-[12px]">
                    <button
                      type="submit"
                      className="bg-black text-white h-[37px] w-[99px] rounded-[8px] uppercase font-[500] text-[14px]"
                    >
                      Sign In
                    </button>
                    <p className="font-[400] text-[12px]">
                      Don't have an Account?{" "}
                      <a href="/signin" className="underline font-[600]">
                        Sign Up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPopup;
