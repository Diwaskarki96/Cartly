import ProductTable from "@/components/product/ProductTable";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

const ProductPage = () => {
  return (
    <Box>
      <Box className="mb-10 w-full flex justify-between items-center">
        <Box className="">
          <Typography variant="h4" sx={{ mb: "20px" }}>
            Product
          </Typography>
          <Box>Breadcrumbs</Box>
        </Box>
        <Button sx={{ height: "40px" }} variant="contained">
          New Product
        </Button>
      </Box>
      <ProductTable />
    </Box>
  );
};

export default ProductPage;
