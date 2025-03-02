import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import TopBarOfMarketing from "../../components/TopBarOfMarketing";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import DoctorService from "../../services/doctorService";
import { jwtDecode } from 'jwt-decode';

export default function IndividualLogin() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")

  const doctorService = new DoctorService();

  const clickToLogin =async()=>{
    const doctorData ={
      email:emailValue,
      password: passwordValue 
    }
    try{
      const response = await doctorService.doctorLogin(doctorData);
      console.log("Login successful",response.data); debugger;
      localStorage.setItem("token",response.data.token) ;debugger;
      const decodedToken = jwtDecode(response.data.token)
      localStorage.setItem("doctorId",decodedToken.id);
      navigate("/dashboard")
    }catch(error){
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      alert("Login failed. Please check your credentials.");
    }
  }
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
              value={emailValue}
              onChange={(e)=>{setEmailValue(e.target.value)}}
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
              type="password"
              variant="filled"
              value={passwordValue}
              onChange={(e)=>{setPasswordValue(e.target.value)}}
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
              onClick={clickToLogin}
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
