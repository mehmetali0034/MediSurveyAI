import { useTheme } from "@emotion/react";
import { Box, Button, Drawer, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../theme";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import AddAdminDoctor from "../../components/AddAdminDoctor";
import MenuIcon from "@mui/icons-material/Menu"; // Menü ikonu
import SidebarTenant from "./SidebarTenant";

export default function TopbarOfTenant(props) {
  const { getSnackBarS } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false)

  const getSnackBarStatus = (status) => {
    getSnackBarS(status);
  };

  const handleLogout = () => {
    localStorage.removeItem("tokenTenant"); // Token'ı sil
    localStorage.removeItem("tenantId"); 
    navigate("/corporate-login"); // Login sayfasına yönlendir
  };
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
        <IconButton onClick={() => setMenuOpen((prev) => !prev)}>
          <MenuIcon sx={{ ml:2, fontSize: 30, color: "black" }} />
        </IconButton>
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
            onClick={handleLogout}
          >
            Log Out
            <LogoutIcon sx={{ ml: 1 }} />
          </Button>

          <SidebarTenant menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <AddAdminDoctor
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />

          
        </Box>
      </Box>

    </Box>
  );
}
