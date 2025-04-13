import { useTheme } from "@emotion/react";
import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../theme";
import Headeer from "../../components/Headeer";

export default function Index() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ ml: 1 }}>
      <Headeer title="Create a File" subtitle="Create File to Filter Patient" />
      <Box>
        <TextField label="Name" variant="outlined" fullWidth required />
      </Box>
    </Box>
  );
}
