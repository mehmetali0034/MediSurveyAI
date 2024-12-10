import { Box, Typography } from "@mui/material";
import React from "react";
import { tokens } from "../theme";
import { useTheme } from "@emotion/react";
import ProgressCircle from "./ProgressCircle";

export default function StatBox(props) {
    const {title, subtitle, icon, increase, progress} = props
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      sx={{ backgroundColor: colors.primary[400] ,padding:2}}
    >
      <Box>
        {icon}
        <Typography variant="h4" fontWeight="bold">
            {title}
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
            {subtitle}
        </Typography>
      </Box>
      <Box>
        <ProgressCircle progress={progress}/>
        <Typography marginTop={2} variant="h6" color={colors.greenAccent[400]} fontStyle="italic">
            +{increase}%
        </Typography>
      </Box>
    </Box>
  );
}
