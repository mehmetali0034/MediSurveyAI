import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import TopbarOfTenant from "../topbar/TopbarOfTenant";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import CountUp from "react-countup"; // Kütüphane eklendi

export default function TenDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ width: "100%" }}>
      <TopbarOfTenant />
      <Box sx={{ marginTop: "4%" }}>
        <Typography>
          
        </Typography>
        <Box sx={{ height: "35vh", m: 5 }}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: 7,
                  backgroundColor: colors.primary[400],
                  p: 3,
                  boxShadow: theme.shadows[4],
                  height: "150px",
                }}
              >
                <Typography sx={{ mb: 1 }} variant="h4">
                  Total Number of Doctor
                </Typography>
                <Typography variant="h2">
                  <CountUp start={0} end={100} duration={2.5} />
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: 7,
                  backgroundColor: colors.primary[400],
                  p: 3,
                  boxShadow: theme.shadows[4],
                  height: "150px",
                }}
              >
                <Typography sx={{ mb: 1 }} variant="h4">
                  Total Patient Patients
                </Typography>
                <Typography variant="h2">
                  <CountUp start={0} end={200} duration={2.5} />
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: 7,
                  backgroundColor: colors.primary[400],
                  p: 3,
                  boxShadow: theme.shadows[4],
                  height: "150px",
                }}
              >
                <Typography sx={{ mb: 1 }} variant="h4">
                  Total Patient Files
                </Typography>
                <Typography variant="h2">
                  <CountUp start={0} end={150} duration={2.5} />
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: 7,
                  backgroundColor: colors.primary[400],
                  p: 3,
                  boxShadow: theme.shadows[4],
                  height: "150px",
                }}
              >
                <Typography sx={{ mb: 1, textAlign: "center" }} variant="h4">
                  Number of Admin Doctors
                </Typography>
                <Typography variant="h2">
                  <CountUp start={0} end={10} duration={2.5} />
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
