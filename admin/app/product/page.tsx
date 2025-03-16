"use client";
import CustomBreadcrumbs from "@/components/global/Breadcrumbs";
import ProductTable from "@/components/product/ProductTable";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const ProductPage = () => {
  const router = useRouter();
  return (
    <Box>
      <Box className="mb-10 w-full flex justify-between items-center">
        <Box className="">
          <Typography variant="h4" sx={{ mb: "20px" }}>
            Product
          </Typography>
          <CustomBreadcrumbs />
        </Box>
        <Button
          sx={{ height: "40px" }}
          variant="contained"
          onClick={() => router.push("/product/create")}
        >
          New Product
        </Button>
      </Box>
      <ProductTable />
    </Box>
  );
};

export default ProductPage;
