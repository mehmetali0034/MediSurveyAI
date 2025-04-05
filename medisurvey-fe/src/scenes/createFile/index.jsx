import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../theme";

export default function Index() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return <Box>asdas</Box>;
}
