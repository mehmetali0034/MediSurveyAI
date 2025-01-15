import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import TopBarOfMarketing from "../../components/TopBarOfMarketing";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

export default function IndividualLogin() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "100%" }}>
      <TopBarOfMarketing />
      <Box sx={{ display: "flex", height: "80vh", mt: 5 }}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{
              width: "65%", // Genişlik
              height: "80%", // Yükseklik
              borderRadius: "20%", // Etrafını yuvarlak yapar
              objectFit: "cover", // Görüntüyü düzgün şekilde kırpar
            }}
            src="../../../assets/marketing-1.jpg"
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: colors.blueAccent[100],
              height: "90%",
              width: "70%",
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontFamily: "serif", m: 5, color: "black", mb: 2  }}
            >
              Welcome to the Doctor Login Screen
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontFamily: "serif", color: "black", mb: 1 }}
            >
              Please Enter Your Information
            </Typography>
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              sx={{
                width: "70%",
                backgroundColor: "white",
                borderRadius: 2,
                m: 2,
              }}
              InputProps={{
                sx: {
                  color: "black", // Yazının rengini siyah yapar
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "black", // Label yazı rengi
                },
              }}
            />

            <TextField
              id="filled-basic"
              label="Password"
              variant="filled"
              sx={{
                width: "70%",
                backgroundColor: "white",
                borderRadius: 2,
                m: 2,
              }}
              InputProps={{
                sx: {
                  color: "black", // Input yazı rengi
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "black", // Label yazı rengi
                },
              }}
            />
            <Button
              type="submit"
              sx={{
                width: "40%",
                backgroundColor: colors.blueAccent[400],
                marginTop: 3,
                fontWeight: "bold",
                fontSize: "0.8rem",
                borderRadius: 10,
              }}
              onClick={()=>navigate("/dashboard")}
            >
              Login
            </Button>
            <Typography sx={{color:"black"}} mt={2} variant="h5">
              Don't have an account?{" "}
              <span
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => navigate("/tenantRegister")}
              >
                Create Account
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
