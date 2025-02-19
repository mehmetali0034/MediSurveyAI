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
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { motion } from "framer-motion";
import TopBarOfMarketing from "../../components/TopBarOfMarketing";
import Footer from "../../components/Footer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import authService from "../../services/authService";

export default function CorporateLogin({ darkMode, setDarkMode }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await authService.tenantLogin(formData);
      setOpenSnackBar(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Giriş sırasında bir hata oluştu");
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
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                },
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
                Kurumsal Giriş
              </Typography>

              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 1, 
                      color: darkMode ? "white" : colors.grey[900]
                    }}
                  >
                    Telefon Numarası
                  </Typography>
                  <TextField
                    fullWidth
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "&:hover fieldset": {
                          borderColor: colors.greenAccent[500],
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: darkMode ? "white" : colors.grey[900],
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: darkMode ? "white" : colors.grey[900] }}>
                    Şifrenizi giriniz
                  </Typography>
                  <TextField
                    fullWidth
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
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon sx={{ color: darkMode ? "rgba(255, 255, 255, 0.7)" : colors.grey[500] }} />
                            ) : (
                              <VisibilityIcon sx={{ color: darkMode ? "rgba(255, 255, 255, 0.7)" : colors.grey[500] }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "&:hover fieldset": {
                          borderColor: colors.greenAccent[500],
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: darkMode ? "white" : colors.grey[900],
                      },
                    }}
                  />
                </Box>

                {error && (
                  <Typography
                    color="error"
                    variant="body2"
                    sx={{ mb: 2, textAlign: "center" }}
                  >
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    background: `linear-gradient(135deg, ${colors.greenAccent[500]}, ${colors.greenAccent[600]})`,
                    color: "white",
                    borderRadius: "12px",
                    padding: "12px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": {
                      background: `linear-gradient(135deg, ${colors.greenAccent[600]}, ${colors.greenAccent[700]})`,
                    },
                  }}
                >
                  Giriş Yap
                </Button>

                <Typography
                  sx={{ textAlign: "center", mt: 3, color: colors.grey[500] }}
                  variant="body1"
                >
                  Hesabınız yok mu?{" "}
                  <span
                    style={{
                      cursor: "pointer",
                      color: colors.greenAccent[500],
                      fontWeight: 600,
                    }}
                    onClick={() => navigate("/register/tenant")}
                  >
                    Hemen Kaydolun
                  </span>
                </Typography>
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
              Giriş başarılı!
            </Typography>
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
