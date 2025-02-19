import { Box, Container, Grid, Typography, TextField, Button, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import { motion } from "framer-motion";
import TopBarOfMarketing from "../../components/TopBarOfMarketing";
import Footer from "../../components/Footer";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Contact({ darkMode, setDarkMode }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const contactInfo = [
    {
      icon: EmailIcon,
      title: "E-posta",
      content: "info@medisurvey.com",
    },
    {
      icon: PhoneIcon,
      title: "Telefon",
      content: "+90 (212) 123 45 67",
    },
    {
      icon: LocationOnIcon,
      title: "Adres",
      content: "Biruni Üniversitesi, 10. Yıl Caddesi Protokol Yolu No: 45, 34010 Zeytinburnu/İstanbul",
    },
  ];

  const ContactCard = ({ icon: Icon, title, content }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      style={{ height: "100%" }}
    >
      <Box
        sx={{
          p: 4,
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          height: "100%",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
            opacity: 0,
            transition: "opacity 0.3s ease",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
            transform: "rotate(45deg)",
            transition: "all 0.8s ease",
            opacity: 0,
          },
          "&:hover": {
            transform: "translateY(-10px)",
            "&::before": {
              opacity: 1,
            },
            "&::after": {
              opacity: 1,
              left: "100%",
              top: "100%",
            },
            "& .icon-container": {
              transform: "scale(1.1) rotate(5deg)",
              background: `linear-gradient(135deg, ${colors.greenAccent[500]}, ${colors.blueAccent[400]})`,
            },
          },
        }}
      >
        <Box
          className="icon-container"
          sx={{
            width: 80,
            height: 80,
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            mb: 2,
          }}
        >
          <Icon sx={{ fontSize: 48, color: colors.greenAccent[400], transition: "all 0.3s ease" }} />
        </Box>
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: 600,
            textAlign: "center",
            position: "relative",
            mb: 2,
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: "50%",
              transform: "translateX(-50%)",
              width: 40,
              height: 3,
              background: `linear-gradient(135deg, ${colors.greenAccent[500]}, ${colors.blueAccent[400]})`,
              borderRadius: "2px",
              transition: "width 0.3s ease",
            },
            "&:hover::after": {
              width: "80%",
            },
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          {content}
        </Typography>
      </Box>
    </motion.div>
  );

  const formContainerStyles = {
    p: 4,
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    height: "100%",
    minHeight: "600px",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: "-50%",
      left: "-50%",
      width: "200%",
      height: "200%",
      background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
      transform: "rotate(45deg)",
      transition: "all 0.8s ease",
      opacity: 0,
    },
    "&:hover": {
      transform: "translateY(-5px)",
      "&::before": {
        opacity: 1,
      },
      "&::after": {
        opacity: 1,
        left: "100%",
        top: "100%",
      },
    },
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
          pt: "64px",
        }}
      >
        <Container maxWidth="lg" sx={{ py: 12 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h1"
              sx={{
                color: "white",
                fontWeight: 700,
                textAlign: "center",
                mb: 3,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              İletişim
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                textAlign: "center",
                mb: 8,
                maxWidth: "800px",
                mx: "auto",
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Sorularınız için bizimle iletişime geçebilirsiniz.
            </Typography>
          </motion.div>

          <Grid container spacing={4} sx={{ mb: 8 }}>
            {contactInfo.map((info, index) => (
              <Grid item xs={12} md={4} key={index}>
                <ContactCard {...info} />
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6} sx={{ height: "600px" }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                style={{ height: "100%" }}
              >
                <Box sx={formContainerStyles}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Adınız"
                        variant="outlined"
                        sx={{
                          mb: 3,
                          "& .MuiOutlinedInput-root": {
                            color: "white",
                            "& fieldset": {
                              borderColor: "rgba(255, 255, 255, 0.3)",
                            },
                            "&:hover fieldset": {
                              borderColor: "rgba(255, 255, 255, 0.5)",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: "rgba(255, 255, 255, 0.7)",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="E-posta"
                        variant="outlined"
                        sx={{
                          mb: 3,
                          "& .MuiOutlinedInput-root": {
                            color: "white",
                            "& fieldset": {
                              borderColor: "rgba(255, 255, 255, 0.3)",
                            },
                            "&:hover fieldset": {
                              borderColor: "rgba(255, 255, 255, 0.5)",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: "rgba(255, 255, 255, 0.7)",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Konu"
                        variant="outlined"
                        sx={{
                          mb: 3,
                          "& .MuiOutlinedInput-root": {
                            color: "white",
                            "& fieldset": {
                              borderColor: "rgba(255, 255, 255, 0.3)",
                            },
                            "&:hover fieldset": {
                              borderColor: "rgba(255, 255, 255, 0.5)",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: "rgba(255, 255, 255, 0.7)",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Mesajınız"
                        variant="outlined"
                        multiline
                        rows={4}
                        sx={{
                          mb: 3,
                          "& .MuiOutlinedInput-root": {
                            color: "white",
                            "& fieldset": {
                              borderColor: "rgba(255, 255, 255, 0.3)",
                            },
                            "&:hover fieldset": {
                              borderColor: "rgba(255, 255, 255, 0.5)",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: "rgba(255, 255, 255, 0.7)",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        size="large"
                        sx={{
                          backgroundColor: "white",
                          color: colors.greenAccent[500],
                          padding: "12px 32px",
                          borderRadius: "30px",
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.9)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                          },
                        }}
                      >
                        Gönder
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6} sx={{ height: "600px" }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                style={{ height: "100%" }}
              >
                <Box
                  sx={{
                    ...formContainerStyles,
                    display: 'flex',
                    alignItems: 'stretch',
                    '& iframe': {
                      flexGrow: 1,
                      margin: '-16px',
                      width: 'calc(100% + 32px)',
                      height: 'calc(100% + 32px)',
                      border: 0,
                      borderRadius: "16px",
                      position: "relative",
                      zIndex: 0,
                    }
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.0222604863247!2d28.88833037675798!3d41.00467897134731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caba23928b3173%3A0xba3c7e11d1c8c227!2sBiruni%20%C3%9Cniversitesi!5e0!3m2!1str!2str!4v1709853063011!5m2!1str!2str"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>

        <Footer />
      </Box>
    </Box>
  );
} 