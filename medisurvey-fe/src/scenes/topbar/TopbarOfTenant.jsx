import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../theme";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import AddAdminDoctor from "../../components/AddAdminDoctor";

export default function TopbarOfTenant() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "9%",
        backgroundColor: "white",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "0 20px",
        }}
      >
        <Typography variant="h2" color="black">
          Authorized Control Panel{" "}
        </Typography>
        <Box>
          <Button
            sx={{
              backgroundColor: colors.greenAccent[600],
              fontSize: "0.9rem",
              mr: 1,
            }}
            variant="contained"
            onClick={() => setOpenDialog(true)}
          >
            Add Doctor
            <PersonAddAlt1Icon sx={{ ml: 1 }} />
          </Button>
          <Button
            sx={{ backgroundColor: colors.redAccent[600], fontSize: "0.9rem" }}
            variant="contained"
            onClick={() => navigate("/MediSurveyAI")}
          >
            Log Out
            <LogoutIcon sx={{ ml: 1 }} />
          </Button>
          <AddAdminDoctor openDialog={openDialog} setOpenDialog={setOpenDialog}/>

          {/* Doktor Ekleme Modalı */}
 
        </Box>
      </Box>
    </Box>
  );
}
