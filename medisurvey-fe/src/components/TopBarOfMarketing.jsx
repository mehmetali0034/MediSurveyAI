import { useTheme } from "@emotion/react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";

export default function TopBarOfMarketing() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ backgroundColor: "white", width: '100%'}}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        {/* Sol Taraf */}
        <Box display="flex" alignItems="center">
          <Typography variant="h4" sx={{ fontStyle: "revert-layer", color: colors.blueAccent[600] }}>
            MEDISURVEY AI
          </Typography>
        </Box>

        {/* Sağ Taraf */}
        <Box display="flex" alignItems="center">
          <Typography 
            variant="h6" 
            sx={{ fontStyle: "revert-layer", color: colors.blueAccent[600], marginRight: "30px", fontSize: "1.2rem" }}
          >
            Hakkımızda
          </Typography>
          <Button 
            variant="contained" 
            sx={{backgroundColor:colors.greenAccent[400], marginRight: "15px", padding: "10px 25px", fontSize: "0.8rem" }}
          >
            Satın Al
          </Button>
          <Button
          onClick={()=>{navigate("/login")}} 
            variant="contained" 
            sx={{ backgroundColor:colors.greenAccent[400], marginRight: "15px", padding: "10px 25px", fontSize: "0.8rem" }}
          >
            Login
          </Button>
          <Button 
            onClick={()=>{navigate("/login")}}
            color="inherit" 
            sx={{ padding: "10px 20px", fontSize: "1rem" }}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
