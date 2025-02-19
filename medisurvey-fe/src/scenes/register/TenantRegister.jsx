import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  Typography,
  useTheme,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { motion } from "framer-motion";
import TopBarOfMarketing from "../../components/TopBarOfMarketing";
import Footer from "../../components/Footer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LockIcon from "@mui/icons-material/Lock";
import authService from "../../services/authService";

export default function TenantRegister({ darkMode, setDarkMode }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone_number: "",
    email: "",
    plan_type: "basic",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");

  const steps = ["Kurum Bilgileri", "İletişim Bilgileri", "Hesap Bilgileri"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeStep !== steps.length - 1) {
      handleNext();
      return;
    }
    
    setError("");
    try {
      const response = await authService.tenantRegister(formData);
      setOpenSnackBar(true);
      setTimeout(() => {
        navigate("/corporate-login");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Kayıt sırasında bir hata oluştu");
    }
  };

  const renderStepContent = (step) => {
    const commonTextFieldProps = {
      fullWidth: true,
      sx: {
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          "&:hover fieldset": {
            borderColor: colors.greenAccent[500],
          },
        },
        "& .MuiInputBase-input": {
          color: darkMode ? "white" : colors.grey[900],
        },
        "& .MuiInputLabel-root": {
          color: darkMode ? "rgba(255, 255, 255, 0.7)" : colors.grey[500],
        },
        mb: 3,
      },
    };

    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="body2" sx={{ mb: 1, color: darkMode ? "white" : colors.grey[900] }}>
              Kurum Adı
            </Typography>
            <TextField
              {...commonTextFieldProps}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Kurum Adı"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon sx={{ color: darkMode ? "rgba(255, 255, 255, 0.7)" : colors.grey[500] }} />
                  </InputAdornment>
                ),
              }}
            />

            <Typography variant="body2" sx={{ mb: 1, color: darkMode ? "white" : colors.grey[900] }}>
              Adres
            </Typography>
            <TextField
              {...commonTextFieldProps}
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Adres"
              multiline
              rows={2}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon sx={{ color: darkMode ? "rgba(255, 255, 255, 0.7)" : colors.grey[500] }} />
                  </InputAdornment>
                ),
              }}
            />
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="body2" sx={{ mb: 1, color: darkMode ? "white" : colors.grey[900] }}>
              Telefon Numarası
            </Typography>
            <TextField
              {...commonTextFieldProps}
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="5XX XXX XX XX"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: darkMode ? "rgba(255, 255, 255, 0.7)" : colors.grey[500] }} />
                  </InputAdornment>
                ),
              }}
            />

            <Typography variant="body2" sx={{ mb: 1, color: darkMode ? "white" : colors.grey[900] }}>
              E-posta
            </Typography>
            <TextField
              {...commonTextFieldProps}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ornek@sirket.com"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: darkMode ? "rgba(255, 255, 255, 0.7)" : colors.grey[500] }} />
                  </InputAdornment>
                ),
              }}
            />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="body2" sx={{ mb: 1, color: darkMode ? "white" : colors.grey[900] }}>
              Şifre
            </Typography>
            <TextField
              {...commonTextFieldProps}
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: darkMode ? "rgba(255, 255, 255, 0.7)" : colors.grey[500] }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? (
                        <VisibilityOffIcon sx={{ color: darkMode ? "rgba(255, 255, 255, 0.7)" : colors.grey[500] }} />
                      ) : (
                        <VisibilityIcon sx={{ color: darkMode ? "rgba(255, 255, 255, 0.7)" : colors.grey[500] }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Typography variant="body2" sx={{ mb: 1, color: darkMode ? "white" : colors.grey[900] }}>
              Şifre Tekrar
            </Typography>
            <TextField
              {...commonTextFieldProps}
              name="password_confirmation"
              type={showPasswordConfirm ? "text" : "password"}
              value={formData.password_confirmation}
              onChange={handleChange}
              placeholder="********"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: darkMode ? "rgba(255, 255, 255, 0.7)" : colors.grey[500] }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} edge="end">
                      {showPasswordConfirm ? (
                        <VisibilityOffIcon sx={{ color: darkMode ? "rgba(255, 255, 255, 0.7)" : colors.grey[500] }} />
                      ) : (
                        <VisibilityIcon sx={{ color: darkMode ? "rgba(255, 255, 255, 0.7)" : colors.grey[500] }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      width: "100%",
      background: darkMode ? colors.primary[500] : 'white',
      color: darkMode ? 'white' : colors.grey[100],
    }}>
      <TopBarOfMarketing darkMode={darkMode} setDarkMode={setDarkMode} />
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode 
            ? `linear-gradient(135deg, ${colors.primary[600]}, ${colors.greenAccent[700]})`
            : `linear-gradient(135deg, ${colors.primary[400]}, ${colors.greenAccent[500]})`,
          display: "flex",
          flexDirection: "column",
          mt: "64px",
        }}
      >
        <Container maxWidth="sm" sx={{ py: 8, flex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={3}
          sx={{
                p: 4,
                borderRadius: "24px",
                background: darkMode ? colors.primary[400] : "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: darkMode ? 'white' : colors.grey[100],
              }}
            >
              <Typography
                variant="h3"
                  sx={{
                  textAlign: "center",
                  mb: 4,
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${colors.greenAccent[500]}, ${colors.blueAccent[400]})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Kurumsal Kayıt
              </Typography>

              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel 
                      sx={{
                        "& .MuiStepLabel-label": {
                          color: darkMode ? "white" : colors.grey[900],
                        },
                        "& .MuiStepLabel-label.Mui-active": {
                          color: darkMode ? colors.greenAccent[500] : colors.greenAccent[600],
                          fontWeight: 600,
                        },
                        "& .MuiStepLabel-label.Mui-completed": {
                          color: darkMode ? colors.greenAccent[500] : colors.greenAccent[600],
                        },
                        "& .MuiStepIcon-root": {
                          color: darkMode ? "rgba(255, 255, 255, 0.3)" : colors.grey[300],
                        },
                        "& .MuiStepIcon-root.Mui-active": {
                          color: darkMode ? colors.greenAccent[500] : colors.greenAccent[600],
                        },
                        "& .MuiStepIcon-root.Mui-completed": {
                          color: darkMode ? colors.greenAccent[500] : colors.greenAccent[600],
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              <form onSubmit={handleSubmit}>
                {renderStepContent(activeStep)}

                {error && (
                  <Typography
                    color="error"
                    variant="body2"
                    sx={{ mb: 2, textAlign: "center" }}
                  >
                    {error}
                  </Typography>
                )}

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="outlined"
                    sx={{
                      borderColor: darkMode ? colors.greenAccent[500] : colors.grey[800],
                      color: darkMode ? colors.greenAccent[500] : colors.grey[800],
                      "&:hover": {
                        borderColor: darkMode ? colors.greenAccent[600] : colors.grey[900],
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    Geri
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      background: `linear-gradient(135deg, ${colors.greenAccent[500]}, ${colors.greenAccent[600]})`,
                      color: "white",
                      "&:hover": {
                        background: `linear-gradient(135deg, ${colors.greenAccent[600]}, ${colors.greenAccent[700]})`,
                      },
                    }}
                  >
                    {activeStep === steps.length - 1 ? "Kaydı Tamamla" : "İleri"}
                  </Button>
                </Box>
              </form>
            </Paper>
          </motion.div>
        </Container>

        <Footer />

                  <Snackbar
                    open={openSnackBar}
                    autoHideDuration={3000}
          onClose={() => setOpenSnackBar(false)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <Alert
            onClose={() => setOpenSnackBar(false)}
                      severity="success"
                      variant="filled"
            sx={{
              width: "100%",
              borderRadius: "12px",
              backgroundColor: colors.greenAccent[500],
            }}
          >
            <Typography variant="body1" color="white">
              Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...
                      </Typography>
                    </Alert>
                  </Snackbar>
      </Box>
    </Box>
  );
}
