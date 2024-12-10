import React from "react";
import Headeer from "../../components/Headeer";
import { Box } from "@mui/material";
import PieChart from "../../components/PieChart";

export default function Pie() {
  return (
    <Box marginLeft={2}>
      <Headeer title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
}
