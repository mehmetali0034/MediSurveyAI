import { Box } from "@mui/material";
import React from "react";
import Headeer from "../../components/Headeer";
import { ResponsiveBar } from "@nivo/bar";
import { mockBarData } from "../../data/mockData";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import BarChart from "../../components/BarChart";
export default function Bar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box>
      <Headeer title="BAR" subtitle="asdasdas" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
}
