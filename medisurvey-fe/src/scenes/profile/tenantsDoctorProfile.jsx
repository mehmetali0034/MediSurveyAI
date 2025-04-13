import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TopbarOfTenant from "../tenant-global/TopbarTenant";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import TenantService from "../../services/tenantService";
import { useParams } from "react-router-dom";

export default function TenantsDoctorProfile() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const tenantService = new TenantService();
  const token = localStorage.getItem("tokenTenant");
  const [doctorInfo, setDoctorInfo] = useState([]);

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const response = await tenantService.getDoctorInfo(id, token);
        setDoctorInfo(response);
        console.log(response);
      } catch (error) {
        console.log("Bir sorun oluştu");
      }
    };
    fetchDoctorInfo();
  }, []);

  const getPatientNumber = async()=>{
    const response = await tenantService.getAllPatients()
  }

  return (
    <Box sx={{ width: "100%" }}>
      <TopbarOfTenant />

      <Box
        sx={{
          width: "40%",
          margin: "2rem auto",
          padding: "2rem",
          borderRadius: 4,
          boxShadow: 10,
          backgroundColor: colors.primary[400],
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            width: "80%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography
              variant="h4"
              sx={{ mr: 2, color: "white", width: "37%" }}
            >
              Name:
            </Typography>
            <TextField
              sx={{
                width: "90%",
                backgroundColor: "white",
                borderRadius: 3,
                "& .MuiInputBase-input": {
                  color: "black",
                },
                "& .Mui-disabled": {
                  "-webkit-text-fill-color": "black !important",
                  opacity: 1,
                },
              }}
              variant="outlined"
              size="small"
              value={doctorInfo.name || ""}
              disabled
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography
              variant="h4"
              sx={{ mr: 2, color: "white", width: "37%" }}
            >
              Surname:
            </Typography>
            <TextField
              sx={{
                width: "90%",
                backgroundColor: "white",
                borderRadius: 3,
                "& .MuiInputBase-input": {
                  color: "black",
                },
                "& .Mui-disabled": {
                  "-webkit-text-fill-color": "black !important",
                  opacity: 1,
                },
              }}
              variant="outlined"
              size="small"
              value={doctorInfo.surname || ""}
              disabled
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography
              variant="h4"
              sx={{ mr: 2, color: "white", width: "37%" }}
            >
              Email:
            </Typography>
            <TextField
              sx={{
                width: "90%",
                backgroundColor: "white",
                borderRadius: 3,
                "& .MuiInputBase-input": {
                  color: "black",
                },
                "& .Mui-disabled": {
                  "-webkit-text-fill-color": "black !important",
                  opacity: 1,
                },
              }}
              variant="outlined"
              size="small"
              value={doctorInfo.email || ""}
              disabled
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography
              variant="h4"
              sx={{ mr: 2, color: "white", width: "37%" }}
            >
              Role:
            </Typography>
            <TextField
              sx={{
                width: "90%",
                backgroundColor: "white",
                borderRadius: 3,
                "& .MuiInputBase-input": {
                  color: "black",
                },
                "& .Mui-disabled": {
                  "-webkit-text-fill-color": "black !important",
                  opacity: 1,
                },
              }}
              variant="outlined"
              size="small"
              value={doctorInfo.role || ""}
              disabled
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography
              variant="h4"
              sx={{ mr: 2, color: "white", width: "37%" }}
            >
              Specialization:
            </Typography>
            <TextField
              sx={{
                width: "90%",
                backgroundColor: "white",
                borderRadius: 3,
                "& .MuiInputBase-input": {
                  color: "black",
                },
                "& .Mui-disabled": {
                  "-webkit-text-fill-color": "black !important",
                  opacity: 1,
                },
              }}
              variant="outlined"
              size="small"
              value={doctorInfo.specialization || ""}
              disabled
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography
              variant="h4"
              sx={{ mr: 2, color: "white", width: "37%" }}
            >
              Hasta Sayısı:
            </Typography>
            <TextField
              sx={{
                width: "90%",
                backgroundColor: "white",
                borderRadius: 3,
                "& .MuiInputBase-input": {
                  color: "black",
                },
                "& .Mui-disabled": {
                  "-webkit-text-fill-color": "black !important",
                  opacity: 1,
                },
              }}
              variant="outlined"
              size="small"
              value={"Bekleniyor.." || ""}
              disabled
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography
              variant="h4"
              sx={{ mr: 2, color: "white", width: "37%" }}
            >
              Dosya Sayısı:
            </Typography>
            <TextField
              sx={{
                width: "90%",
                backgroundColor: "white",
                borderRadius: 3,
                "& .MuiInputBase-input": {
                  color: "black",
                },
                "& .Mui-disabled": {
                  "-webkit-text-fill-color": "black !important",
                  opacity: 1,
                },
              }}
              variant="outlined"
              size="small"
              value={"Bekleniyor.." || ""}
              disabled
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
