import { Box, Drawer, List, ListItem, ListItemText, IconButton, Typography, Divider } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from '@mui/icons-material/Groups';
import CloseIcon from "@mui/icons-material/Close";
import Groups2Icon from '@mui/icons-material/Groups2';
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SidebarTenant({ menuOpen, setMenuOpen }) {
  const navigate = useNavigate();

  return (
    <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
      <Box sx={{ width: 250, bgcolor: "#f4f4f4", height: "100%" }}>
        {/* Üst Kısım - Menü Başlığı ve Kapatma Butonu */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", textAlign: "center", flexGrow: 1 }}>
          Menu  
          </Typography>
          <IconButton onClick={() => setMenuOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />

        {/* Menü Öğeleri */}
        <List>
          <ListItem 
            onClick={() => navigate("/tenant/dashboard")}
            sx={{ "&:hover": { bgcolor: "#e0e0e0" } }}
          >
            <DashboardIcon sx={{ mr: 2, color: "#333" }} />
            <ListItemText primary="Dashboard" sx={{ color: "black" }} />
          </ListItem>

          <ListItem       
            onClick={() => navigate("/tenant/profile")}
            sx={{ "&:hover": { bgcolor: "#e0e0e0" } }}
          >
            <AccountCircleIcon sx={{ mr: 2, color: "#333" }} />
            <ListItemText primary="Profile" sx={{ color: "black" }} />
          </ListItem>
          <ListItem
          onClick={() => navigate("/tenant/doctors")}
          sx={{ "&:hover": { bgcolor: "#e0e0e0" } }}
        >
          <Groups2Icon sx={{ mr: 2, color: "#333" }}/>
            <ListItemText primary="Doctors" sx={{ color: "black" }}/>
          </ListItem>
          <ListItem
          onClick={() => navigate("/tenant/patients")}
          sx={{ "&:hover": { bgcolor: "#e0e0e0" } }}
        >
          <GroupsIcon sx={{ mr: 2, color: "#333" }}/>
            <ListItemText primary="Patients" sx={{ color: "black" }}/>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
