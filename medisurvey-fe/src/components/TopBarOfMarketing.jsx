import { useTheme } from "@emotion/react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
export default function TopBarOfMarketing() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const clickToBuy = () => {
    navigate("/tenantRegister");
  };
  const clicktToCorporateLogin=()=>{
    navigate("/corporate-login")
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", width: "100%" }}>
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        {/* Sol Taraf */}
        <Box display="flex" alignItems="center">
          <Button onClick={()=>navigate("/")}>
            <Typography
              variant="h4"
              sx={{ fontStyle: "revert-layer", color: colors.blueAccent[600] }}
            >
              MEDISURVEY AI
            </Typography>
          </Button>
        </Box>
        {/* Sağ Taraf */}
        <Box display="flex" alignItems="center" sx={{ marginRight: 8 }}>
          <Typography
            variant="h6"
            sx={{
              fontStyle: "revert-layer",
              color: colors.blueAccent[600],
              marginRight: "30px",
              fontSize: "1.2rem",
            }}
          >
            About
          </Typography>
          <Button
            onClick={clickToBuy}
            variant="contained"
            sx={{
              backgroundColor: colors.blueAccent[400],
              marginRight: "15px",
              padding: "10px 25px",
              fontSize: "0.9rem",
            }}
          >
            Buy
          </Button>
          <Button
            onClick={handleMenuOpen}
            variant="contained"
            sx={{
              backgroundColor: colors.primary[400],
              marginRight: "15px",
              padding: "10px 25px",
              fontSize: "0.9rem",
            }}
          >
            Login
            <ArrowDropDownIcon sx={{ marginLeft: 1 }} />
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{
              transition: "all 0.3s ease", // Geçiş animasyonu ekliyoruz
            }}
          >
            <MenuItem
            onClick={()=>navigate("/individual-login")}
              sx={{
                backgroundColor: colors.greenAccent[500],
                padding: 1,
                borderRadius: 2,
                margin: 1,
                width: 150,
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Individual Login
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: colors.redAccent[500],
                padding: 1,
                borderRadius: 2,
                margin: 1,
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
              onClick={clicktToCorporateLogin}
            >
              Corporate Login
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
