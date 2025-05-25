import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, Typography } from "@mui/material";

const COLORS = ["#82ca9d","#8884d8"]; // Erkek, Kadın

export default function GenderPieChart({ patients }) {
  const genderCount = patients?.reduce(
    (acc, patient) => {
      const gender = patient.gender?.toLowerCase();
      if (gender === "male") acc[0].value += 1;
      else if (gender === "female") acc[1].value += 1;
      return acc;
    },
    [
      { name: "Male", value: 0 },
      { name: "Female", value: 0 },
    ]
  );

  return (
    <Box height={250} p={2}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={genderCount}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            dataKey="value"
          >
            {genderCount.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
