import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, useTheme, Button } from "@mui/material";
import TenantService from "../services/tenantService";
import { tokens } from "../theme";

export default function EditTenantInfo({ changeEditState }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tenantInfo, setTenantInfo] = useState({});
  const tenantService = new TenantService();
  const tenantId = localStorage.getItem("tenantId");
  const token = localStorage.getItem("tokenTenant");

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

  // onChange handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTenantInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await tenantService.updateTenant(tenantInfo, tenantId, token);
      console.log("Güncelleme başarılı:", response);
      changeEditState(false)
    } catch (error) {
      console.error("Güncelleme sırasında bir hata oluştu:", error);
    }
  };

  return (
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
              color: "black",
            },
            "& .Mui-disabled": {
              "-webkit-text-fill-color": "black !important",
              opacity: 1,
            },
          }}
          variant="outlined"
          size="small"
          value={tenantInfo.name || ""}
          onChange={handleInputChange}
          name="name"
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography variant="body1" sx={{ mr: 2, color: "black", width: "13%" }}>
          Email:
        </Typography>
        <TextField
          sx={{
            width: "80%",
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
          value={tenantInfo.email || ""}
          onChange={handleInputChange}
          name="email"
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography variant="body1" sx={{ mr: 2, color: "black", width: "13%" }}>
          Phone Number:
        </Typography>
        <TextField
          sx={{
            width: "80%",
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
          value={tenantInfo.phone_number || ""}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              handleInputChange(e);
            }
          }}
          name="phone_number"
          inputProps={{
            pattern: "[0-9]*",
            inputMode: "numeric",
          }}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography variant="body1" sx={{ mr: 2, color: "black", width: "13%" }}>
          Plan Type:
        </Typography>
        <TextField
          sx={{
            width: "80%",
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
          value={tenantInfo.plan_type || ""}
          disabled
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography variant="body1" sx={{ mr: 2, color: "black", width: "13%" }}>
          Password:
        </Typography>
        <TextField
          sx={{
            width: "80%",
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
          type="password"
          variant="outlined"
          size="small"
          value={tenantInfo.plan_type || ""}
          disabled
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "end" }}>
        <Box sx={{ mr: 4 }}>
          <Button
            variant="contained"
            sx={{ mr: 1, backgroundColor: colors.redAccent[600] }}
            onClick={() => {
              changeEditState(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: colors.greenAccent[800] }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
