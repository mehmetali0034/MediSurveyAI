import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Headeer from "../../components/Headeer";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import DoctorService from "../../services/doctorService";

export default function DoctorProfile() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const doctorService = new DoctorService();
  const [doctorInfo, setDoctorInfo] = useState([]);
  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const response = await doctorService.getDoctorInfo();
        setDoctorInfo(response);
        console.log("data:", response);
      } catch {
        console.log("Bir sorun oluştu");
      }
    };
    fetchDoctorInfo();
  }, []);

  return (
    <Box>
      <Headeer title="Profile" subtitle="User Profile" />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "40%",
            padding: 3,
            borderRadius: 3,
            boxShadow: 10,
            backgroundColor: colors.primary[400],
          }}
        >
          <img
            alt="profile-user"
            width="100px"
            height="100px"
            src={`../../assets/avatarPhoto.jpg`}
            style={{
              cursor: "pointer",
              borderRadius: "50%",
              marginBottom: "1rem",
              objectFit: "cover",
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", width: "80%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography sx={{ width: "30%" }}>Name :</Typography>
              <TextField
                value={doctorInfo.doctor.name || ""}
                sx={{ width: "80%", borderRadius: 3 }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography sx={{ width: "30%" }}>Surname :</Typography>
              <TextField
                value={doctorInfo.doctor.surname || ""}
                sx={{ width: "80%", borderRadius: 3 }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography sx={{ width: "30%" }}>Email :</Typography>
              <TextField
                value={doctorInfo.doctor.email || ""}
                sx={{ width: "80%", borderRadius: 3 }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography sx={{ width: "30%" }}>Phone Number :</Typography>
              <TextField
                value={doctorInfo.doctor.phone_number || ""}
                sx={{ width: "80%", borderRadius: 3 }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography sx={{ width: "30%" }}>Specialization :</Typography>
              <TextField
                value={doctorInfo.doctor.specialization || ""}
                sx={{ width: "80%", borderRadius: 3 }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography sx={{ width: "30%" }}>Role :</Typography>
              <TextField
                value={doctorInfo.doctor.role || ""}
                sx={{ width: "80%", borderRadius: 3,onFocus:false }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
