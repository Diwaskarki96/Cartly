"use client";
import { $axios } from "@/axios/axiosInstance";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  changePasswordValidation,
  editProfileValidation,
} from "@/validation/editProfileValidationSchema";
import { LinearProgress } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const AccountPage = () => {
  const param = useParams();
  const userID = param.id;
  const { isPending: getUserDetailPending, data } = useQuery({
    queryKey: ["get-user-details"],
    queryFn: () => {
      return $axios.post(`/user/user-detail/${userID}`);
    },
  });
  const { isPending: editProfilePending, mutate: editProfileMutate } =
    useMutation({
      mutationKey: ["edit-profile"],
      mutationFn: (values) => {
        return $axios.put(`/user/editProfile/${userID}`, values);
      },
      onSuccess: (res) => {
        toast.success(res?.data?.message);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      },
    });
  const { isPending: changePasswordPending, mutate: changePasswordMutate } =
    useMutation({
      mutationKey: ["changePassword"],
      mutationFn: (values) => {
        return $axios.put(`/user/changePassword/${userID}`, {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        });
      },
      onSuccess: (res) => {
        toast.success(res?.data?.message);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.msg);
      },
    });
  const userDetails = data?.data?.data;
  console.log({ userDetails });
  return (
    <div>
      {/* <Breadcrumbs /> */}
      <div className="w-full">
        <Formik
          initialValues={{
            firstName: userDetails?.firstName || "",
            lastName: userDetails?.lastName || "",
          }}
          enableReinitialize={true}
          validationSchema={editProfileValidation}
          onSubmit={async (values) => {
            editProfileMutate(values);
          }}
        >
          {(formik) => {
            return (
              <form onSubmit={formik.handleSubmit}>
                {(getUserDetailPending ||
                  editProfilePending ||
                  changePasswordPending) && <LinearProgress />}
                <div className="w-[80%] flex items-end justify-between">
                  <h1 className="text-2xl mt-4 text-red-600">
                    Edit Your Profile
                  </h1>

                  <h1 className="text-base">
                    Welcome!
                    <span className="text-red-600 capitalize">
                      {userDetails?.firstName} {userDetails?.lastName}
                    </span>
                  </h1>
                </div>
                <div className="flex gap-8 mt-7 w-full">
                  <div className="w-full">
                    <p>First Name</p>
                    <Input
                      type="text"
                      className="capitalize"
                      {...formik.getFieldProps("firstName")}
                    />
                  </div>
                  <div className="w-full">
                    <p>Last Name</p>

                    <Input
                      type="text"
                      className="capitalize"
                      {...formik.getFieldProps("lastName")}
                    />
                  </div>
                </div>
                <div className="flex justify-items-end w-full mt-3">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            );
          }}
        </Formik>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
          }}
          validationSchema={changePasswordValidation}
          onSubmit={(values) => {
            changePasswordMutate(values);
          }}
        >
          {(formik) => {
            return (
              <form onSubmit={formik.handleSubmit}>
                <div className=" mt-7">
                  <p>Password Changes</p>
                  <Input
                    type="password"
                    {...formik.getFieldProps("oldPassword")}
                    placeholder="Current Password"
                    className="mt-5"
                  />
                  <Input
                    type="password"
                    {...formik.getFieldProps("newPassword")}
                    placeholder="New Password"
                    className="mt-5"
                  />
                  {/* <Input
          type="password"
          placeholder="Confirm New Password"
          className="mt-5"
        /> */}
                </div>
                <div className="flex justify-items-end w-full mt-3">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AccountPage;
