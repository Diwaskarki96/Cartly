"use client";
import { $axios } from "@/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";

import addProductValidationSchema from "@/validation/addProductValidation";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { productCategories } from "@/constant";

const CreateProductPage = () => {
  const { isPending, mutate } = useMutation({
    mutationKey: ["add-product"],
    mutationFn: async (values) => {
      return await $axios.post("/product/add", values);
    },
    onSuccess: (res) => {
      console.log("Product added successfully:", res.data);
    },
    onError: (error) => {
      console.error(
        "Error adding product:",
        error.response?.data || error.message
      );
    },
  });
  return (
    <Box>
      <Typography className="text-2xl" variant="h4">
        Add Products
      </Typography>
      <Box>
        <Formik
          initialValues={{
            image: null,
            name: "",
            price: 0,
            description: "",
            quantity: 1,
            color: "",
            size: "",
            category: "",
            isStock: true,
            isFeatured: false,
            freeShipping: false,
          }}
          validationSchema={addProductValidationSchema}
          onSubmit={(values) => {
            console.log("Form Submitted", values);
            mutate(values);
          }}
          // onSubmit={async (values) => {
          //   let imageUrl = null;
          //   if (productImage) {
          //     const data = new FormData();
          //     data.append("file", productImage);
          //     data.append("upload_preset", uploadPreset);
          //     data.append("cloud_name", cloudName);
          //     try {
          //       setimageUploadLoading(true);
          //       const response = await axios.post(
          //         `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
          //         data
          //       );
          //       imageUrl = response?.data?.secure_url;
          //       setimageUploadLoading(false);
          //     } catch (error) {
          //       setimageUploadLoading(false);
          //       console.log(error.message);
          //     }
          //   }
          //   values.image = imageUrl;
          //   mutate(values);
          // }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                padding: "1rem",
                gap: "1rem",
                width: "50%",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <Typography variant="h5">Add Product</Typography>
              {/* {localUrl && (
                <Stack sx={{ height: "250px" }}>
                  <img src={localUrl} alt="" height="100%" width="100%" />
                </Stack>
              )} */}
              <FormControl>
                {/* <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setProductImage(file);
                    setLocalUrl(URL.createObjectURL(file));
                  }}
                /> */}
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Name"
                  {...formik.getFieldProps("name")}
                  required
                />

                {formik.touched.name && formik.errors.name ? (
                  <FormHelperText error>{formik.errors.name}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Price</InputLabel>
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">Rs.</InputAdornment>
                  }
                  label="Price"
                  type="number"
                  {...formik.getFieldProps("price")}
                />
                {formik.touched.price && formik.errors.price ? (
                  <FormHelperText error>{formik.errors.price}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Quantity"
                  {...formik.getFieldProps("quantity")}
                  type="number"
                  required
                />

                {formik.touched.quantity && formik.errors.quantity ? (
                  <FormHelperText error>
                    {formik.errors.quantity}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Color"
                  {...formik.getFieldProps("color")}
                  required
                />

                {formik.touched.color && formik.errors.color ? (
                  <FormHelperText error>{formik.errors.color}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Size"
                  {...formik.getFieldProps("size")}
                  required
                />

                {formik.touched.size && formik.errors.size ? (
                  <FormHelperText error>{formik.errors.size}</FormHelperText>
                ) : null}
              </FormControl>
              {/* <FormControl fullWidth>
                <TextField
                  label="Price"
                  {...formik.getFieldProps("price")}
                  type="number"
                  required
                />

                {formik.touched.price && formik.errors.price ? (
                  <FormHelperText error>{formik.errors.price}</FormHelperText>
                ) : null}
              </FormControl> */}

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <FormControl fullWidth>
                  <FormControlLabel
                    control={
                      <Checkbox {...formik.getFieldProps("freeShipping")} />
                    }
                    label="Free Shipping"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <FormControlLabel
                    control={
                      <Checkbox {...formik.getFieldProps("isFeatured")} />
                    }
                    label="Featured"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <FormControlLabel
                    control={<Checkbox {...formik.getFieldProps("isStock")} />}
                    label="In Stock"
                  />
                </FormControl>
              </Box>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select label="Category" {...formik.getFieldProps("category")}>
                  {productCategories.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>

                {formik.touched.category && formik.errors.category ? (
                  <FormHelperText error>
                    {formik.errors.category}
                  </FormHelperText>
                ) : null}
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  required
                  multiline
                  rows={4}
                  label="Description"
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description ? (
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                ) : null}
              </FormControl>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="success"
                onClick={() => {
                  mutate();
                }}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default CreateProductPage;
