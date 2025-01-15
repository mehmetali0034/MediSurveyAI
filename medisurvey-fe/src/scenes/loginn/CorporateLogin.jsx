import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import TopBarOfMarketing from "../../components/TopBarOfMarketing";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import TenantService from "../../services/tenantService";
import { useNavigate } from "react-router-dom";

export default function CorporateLogin() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tenantService = new TenantService();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();

  const clickToLogin = async () => {
    const tenantData = {
      email: emailValue,
      phone_number: passwordValue,
    };

    try {
      const response = await tenantService.tenantLogin(tenantData);
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token); // Token'ı localStorage'a kaydettim
      navigate("/tenant/dashboard");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TopBarOfMarketing />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
        }}
      >
        <Box
          sx={{
            width: "50%",
            height: "70%",
            backgroundColor: colors.primary[600],
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 80,
          }}
        >
          <Typography sx={{ fontFamily: "serif" }} variant="h2">
            Welcome To The Authorized Login Screen
          </Typography>
          <Typography sx={{ fontFamily: "serif", m: 2 }} variant="h4">
            Please Enter Your Information
          </Typography>

          <TextField
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            sx={{
              backgroundColor: colors.grey[200],
              width: "50%",
              borderRadius: 2,
              margin: 2,
            }}
            id="filled-basic"
            label="Email"
            variant="filled"
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

          <TextField
            type="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            sx={{
              backgroundColor: colors.grey[200],
              width: "50%",
              borderRadius: 2,
            }}
            id="filled-basic"
            label="Password"
            variant="filled"
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
            onClick={clickToLogin}
            type="submit"
            sx={{
              width: "50%",
              backgroundColor: colors.greenAccent[400],
              marginTop: 3,
              fontWeight: "bold",
              fontSize: "0.8rem",
            }}
          >
            Login
          </Button>
          <Typography mt={2} variant="h5">
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
  );
}
