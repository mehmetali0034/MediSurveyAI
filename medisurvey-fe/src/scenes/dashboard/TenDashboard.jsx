import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import CountUp from "react-countup"; // Kütüphane eklendi
import TenantService from "../../services/tenantService";
import TopbarOfTenant from "../tenant-global/TopbarTenant";


export default function TenDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [adminDoctors, setAdminDoctors] = useState([]);
  const [userDoctors, setUserDoctors] = useState([])
  const token = localStorage.getItem("tokenTenant"); // Token anahtarını buraya yaz
  const tenantService = new TenantService();
  const allDoctors = [...adminDoctors,...userDoctors]
  useEffect(() => { 
    const fetchAllDoctors = async ()=>{
      try{
        const response = await tenantService.getAllDoctor(token)
        setAdminDoctors(response.doctors.admins)
        const formattedDoctors = response.doctors.admins
        .flatMap(admin => admin.normalDoctors) // Tüm adminlerin normalDoctors dizilerini tek dizi yap
        .filter(doctor => doctor.role === "doctor"); // Sadece role: doctor olanları al

      setUserDoctors(formattedDoctors);
      }catch(error){
        console.log("Sorun oluştu")
      }
    }
    fetchAllDoctors();
   },[token]); // Token değişirse tekrar çalışır

  return (
    <Box sx={{ width: "100%" }}>
      <TopbarOfTenant/>
      <Box sx={{ marginTop: "4%" }}>
        <Typography></Typography>
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
                  <CountUp start={0} end={allDoctors.length} duration={2.5} />
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
                Total Number of Admin Doctor
                </Typography>
                <Typography variant="h2">
                  <CountUp start={0} end={adminDoctors.length} duration={2.5} />
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
                Total Number of Normal Doctor
                </Typography>
                <Typography variant="h2">
                  <CountUp start={0} end={userDoctors.length} duration={2.5} />
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
