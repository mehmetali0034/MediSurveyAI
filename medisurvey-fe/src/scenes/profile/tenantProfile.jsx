import React, { useEffect, useState } from "react";
import TopbarOfTenant from "../tenant-global/TopbarTenant";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  TextField,
  useTheme,
  Button,
} from "@mui/material";
import TenantService from "../../services/tenantService";
import { tokens } from "../../theme";

export default function TenantProfile() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [tenantInfo, setTenantInfo] = useState({});
  const tenantService = new TenantService();
  const tenantId = localStorage.getItem("tenantId");
  const token = localStorage.getItem("tokenTenant");
  const [cancelDisabled, setCancelDisabled] = useState("none")
  const [saveDisabled, setSaveDisabled] = useState("none")


  useEffect(() => {
    tenantService
      .getTenantInfo(tenantId, token)
      .then((data) => {
        setTenantInfo(data);
      })
      .catch((error) => {
        console.error("Doktor bilgileri çekilirken hata oluştu", error);
      });
  }, [token]);

  const clickToEdit =()=>{

  }

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <TopbarOfTenant />
      <Box
        sx={{
          width: "50%",
          backgroundColor: colors.grey[100],
          boxShadow: 3,
          borderRadius: 2,
          mt: 1,
          ml: 2,
          p: 2,
        }}
      >
        <Typography color={"black"} variant="h3">
          Account Information
        </Typography>
        <Box sx={{ display: "flex", mt: 2, flexDirection: "column" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="body1" sx={{ mr: 2, color: "black" }}>
              Institution Name:
            </Typography>
            <TextField
              sx={{
                width: "80%",
                backgroundColor: "white",
                borderRadius: 3,
                "& .MuiInputBase-input": {
                  color: "black", // Yazı rengini siyah yap
                },
                "& .Mui-disabled": {
                  "-webkit-text-fill-color": "black !important", // Disabled yazı rengini siyah yap
                  opacity: 1, // Mat görünümü kaldır
                },
              }}
              variant="outlined"
              size="small"
              value={tenantInfo.name || ""}
              disabled
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography
              variant="body1"
              sx={{ mr: 2, color: "black", width: "13%" }}
            >
              Email:
            </Typography>
            <TextField
              sx={{
                width: "80%",
                backgroundColor: "white",
                borderRadius: 3,
                "& .MuiInputBase-input": {
                  color: "black", // Yazı rengini siyah yap
                },
                "& .Mui-disabled": {
                  "-webkit-text-fill-color": "black !important", // Disabled yazı rengini siyah yap
                  opacity: 1, // Mat görünümü kaldır
                },
              }}
              variant="outlined"
              size="small"
              value={tenantInfo.email || ""}
              disabled
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography
              variant="body1"
              sx={{ mr: 2, color: "black", width: "13%" }}
            >
              Phone Number:
            </Typography>
            <TextField
              sx={{
                width: "80%",
                backgroundColor: "white",
                borderRadius: 3,
                "& .MuiInputBase-input": {
                  color: "black", // Yazı rengini siyah yap
                },
                "& .Mui-disabled": {
                  "-webkit-text-fill-color": "black !important", // Disabled yazı rengini siyah yap
                  opacity: 1, // Mat görünümü kaldır
                },
              }}
              variant="outlined"
              size="small"
              value={tenantInfo.phone_number || ""}
              disabled
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography
              variant="body1"
              sx={{ mr: 2, color: "black", width: "13%" }}
            >
              Plan Type:
            </Typography>
            <TextField
              sx={{
                width: "80%",
                backgroundColor: "white",
                borderRadius: 3,
                "& .MuiInputBase-input": {
                  color: "black", // Yazı rengini siyah yap
                },
                "& .Mui-disabled": {
                  "-webkit-text-fill-color": "black !important", // Disabled yazı rengini siyah yap
                  opacity: 1, // Mat görünümü kaldır
                },
              }}
              variant="outlined"
              size="small"
              value={tenantInfo.plan_type || ""}
              disabled
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography
              variant="body1"
              sx={{ mr: 2, color: "black", width: "13%" }}
            >
              Password:
            </Typography>
            <TextField
              sx={{
                width: "80%",
                backgroundColor: "white",
                borderRadius: 3,
                "& .MuiInputBase-input": {
                  color: "black", // Yazı rengini siyah yap
                },
                "& .Mui-disabled": {
                  "-webkit-text-fill-color": "black !important", // Disabled yazı rengini siyah yap
                  opacity: 1, // Mat görünümü kaldır
                },
              }}
              type="password"
              variant="outlined"
              size="small"
              value={tenantInfo.plan_type || ""}
              disabled
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ml: 14,}}>
              <Button
                variant="contained"
                sx={{ mr: 1, backgroundColor: colors.blueAccent[800] }}
                onClick={clickToEdit}
              >
                Edit Information
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: colors.blueAccent[800] }}
              >
                Change Password
              </Button>
            </Box>
            <Box sx={{mr:4 ,}}>
              <Button
                variant="contained"
                sx={{ mr: 1, backgroundColor: colors.redAccent[600], display: {cancelDisabled},}}
                
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: colors.greenAccent[800],display: {saveDisabled} }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}