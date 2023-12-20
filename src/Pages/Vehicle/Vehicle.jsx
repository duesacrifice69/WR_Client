import React from "react";
import Header from "../../components/Header";
import { Box } from "@mui/material";

const Vehicle = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Vehicle"
        subtitle="All the registered vehicle under the selected compnay."
      />
    </Box>
  );
};

export default Vehicle;
