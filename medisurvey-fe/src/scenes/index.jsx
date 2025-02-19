import { Box, Container, Grid, Typography, Button, useTheme, Paper } from "@mui/material";
import React from "react";
import { tokens } from "../theme";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import TimelineIcon from "@mui/icons-material/Timeline";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Footer from "../components/Footer";

export default function Index({ darkMode, setDarkMode }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const features = [
    {
      icon: MonitorHeartIcon,
      title: "Hasta Takip Sistemi",
      description: "Hastaların tedavi süreçlerini düzenli olarak takip edin, ağrı seviyesi ve hareket kısıtlılığı gibi verileri kaydedin.",
    },
    {
      icon: PsychologyIcon,
      title: "Yapay Zeka Desteği",
      description: "Gelişmiş AI algoritmaları ile hasta verilerini analiz ederek, tedavi sürecinde optimize edilmiş kararlar alın.",
    },
    {
      icon: TimelineIcon,
      title: "Veri Analizi",
      description: "Hasta verilerini geçmiş vakalarla karşılaştırın, tedavi yöntemlerinin etkinliğini değerlendirin.",
    },
    {
      icon: AnalyticsIcon,
      title: "Bilimsel Raporlama",
      description: "Veri analitiği sonuçlarını bilimsel raporlar ve makaleler hazırlamak için kullanın.",
    },
  ];

  const benefits = [
    {
      title: "Kişiselleştirilmiş Tedavi",
      description: "Yapay zeka algoritmaları sayesinde her hasta için özelleştirilmiş tedavi planları oluşturun.",
      icon: AssessmentIcon,
    },
    {
      title: "Erken Tespit",
      description: "Olası komplikasyonları erkenden tespit ederek önleyici tedbirler alın.",
      icon: MonitorHeartIcon,
    },
    {
      title: "Veri Tabanlı Kararlar",
      description: "Geçmiş vaka analizleri ile desteklenmiş klinik kararlar verin.",
      icon: TimelineIcon,
    },
  ];

  const FeatureCard = ({ icon: Icon, title, description }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          height: "100%",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "translateY(-10px)",
          },
        }}
      >
        <Icon
          sx={{
            fontSize: 48,
            color: colors.greenAccent[400],
            mb: 2,
          }}
        />
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: 600,
            mb: 2,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>
      </Paper>
    </motion.div>
  );

  const BenefitCard = ({ icon: Icon, title, description }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 3,
          p: 3,
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
          },
        }}
      >
        <Icon sx={{ fontSize: 40, color: colors.greenAccent[400], mt: 1 }} />
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontWeight: 600,
              mb: 1,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${colors.primary[400]}, ${colors.greenAccent[500]})`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 15, pb: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    color: "white",
                    fontWeight: 700,
                    mb: 3,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Yapay Zeka Destekli
                  <br />
                  <span
                    style={{
                      background: `linear-gradient(135deg, ${colors.greenAccent[300]}, ${colors.blueAccent[200]})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Sağlık Anketi
                  </span>
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    mb: 4,
                    fontWeight: 300,
                    lineHeight: 1.6,
                  }}
                >
                  Ortopedi ve kas-iskelet sistemi rahatsızlıklarında doktorlara karar desteği sağlayan yapay zeka tabanlı hasta takip sistemi.
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/register/tenant")}
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
                    Hemen Başla
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/about")}
                    sx={{
                      borderColor: "white",
                      color: "white",
                      padding: "12px 32px",
                      borderRadius: "30px",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      "&:hover": {
                        borderColor: "rgba(255,255,255,0.9)",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    Daha Fazla Bilgi
                  </Button>
                </Box>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "10%",
                    left: "10%",
                    width: "80%",
                    height: "80%",
                    background: `linear-gradient(135deg, ${colors.greenAccent[500]}, ${colors.blueAccent[400]})`,
                    borderRadius: "30px",
                    filter: "blur(25px)",
                    opacity: 0.3,
                    zIndex: 0,
                  },
                }}
              >
                <img
                  src="../assets/ComputerPhoto.png"
                  alt="MediSurvey Dashboard"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "600px",
                    borderRadius: "20px",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "white",
              textAlign: "center",
              mb: 2,
              fontWeight: 600,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Özellikler
          </Typography>
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              textAlign: "center",
              mb: 8,
              maxWidth: "600px",
              mx: "auto",
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            Yapay zeka destekli hasta takip sistemi ile tedavi süreçlerini optimize edin
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(10px)",
          py: 10,
          mt: 8,
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                color: "white",
                textAlign: "center",
                mb: 2,
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Faydalar
            </Typography>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                textAlign: "center",
                mb: 8,
                maxWidth: "600px",
                mx: "auto",
                fontSize: "1.1rem",
                lineHeight: 1.6,
              }}
            >
              Sistemimizin sunduğu avantajlar ile hasta tedavi süreçlerini iyileştirin
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={4} key={index}>
                <BenefitCard {...benefit} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              textAlign: "center",
              p: 6,
              borderRadius: "30px",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <HealthAndSafetyIcon
              sx={{
                fontSize: 64,
                color: colors.greenAccent[400],
                mb: 3,
              }}
            />
            <Typography
              variant="h3"
              sx={{
                color: "white",
                fontWeight: 600,
                mb: 2,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Sağlık Hizmetlerinizi Dijitalleştirin
            </Typography>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                mb: 4,
                maxWidth: "600px",
                mx: "auto",
                fontSize: "1.1rem",
                lineHeight: 1.6,
              }}
            >
              Yapay zeka destekli sistemimiz ile hasta takibini optimize edin, tedavi süreçlerini iyileştirin.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/register/tenant")}
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
              Hemen Başla
            </Button>
          </Box>
        </motion.div>
      </Container>

      <Footer />
    </Box>
  );
} 