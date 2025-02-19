import { Box, Container, Grid, Typography, Button, useTheme, Paper, Avatar } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import TimelineIcon from "@mui/icons-material/Timeline";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AssessmentIcon from "@mui/icons-material/Assessment";
import TopBarOfMarketing from "../../components/TopBarOfMarketing";
import Footer from "../../components/Footer";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ScienceIcon from "@mui/icons-material/Science";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import WatchIcon from "@mui/icons-material/Watch";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";

export default function Marketing({ darkMode, setDarkMode }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // Global styles for animations
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% {
          transform: translateY(0px) rotate(0deg);
        }
        50% {
          transform: translateY(-20px) rotate(2deg);
        }
        100% {
          transform: translateY(0px) rotate(0deg);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

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

  const testimonials = [
    {
      comment: "Bu platform sayesinde hasta takibimiz çok daha verimli hale geldi. Yapay zeka destekli analizler tedavi sürecimizi optimize etmemize yardımcı oluyor.",
      name: "Dr. Ayşe Yılmaz",
      title: "Ortopedi Uzmanı",
    },
    {
      comment: "Hastaların tedavi sürecini takip etmek ve verileri analiz etmek artık çok daha kolay. Sistem gerçekten çok kullanıcı dostu.",
      name: "Dr. Mehmet Kaya",
      title: "Fizik Tedavi Uzmanı",
    },
    {
      comment: "Yapay zeka destekli öngörüler sayesinde tedavi planlarımızı daha etkili bir şekilde oluşturabiliyoruz. Harika bir sistem!",
      name: "Dr. Zeynep Demir",
      title: "Romatoloji Uzmanı",
    },
  ];

  const integrations = [
    {
      name: "Hastane Bilgi Sistemleri",
      icon: LocalHospitalIcon,
    },
    {
      name: "Laboratuvar Sistemleri",
      icon: ScienceIcon,
    },
    {
      name: "Görüntüleme Sistemleri",
      icon: ImageSearchIcon,
    },
    {
      name: "Giyilebilir Cihazlar",
      icon: WatchIcon,
    },
    {
      name: "E-Reçete Sistemleri",
      icon: ReceiptLongIcon,
    },
    {
      name: "Mobil Uygulamalar",
      icon: PhoneIphoneIcon,
    },
    {
      name: "Takvim Sistemleri",
      icon: CalendarMonthIcon,
    },
    {
      name: "Veri Analiz Araçları",
      icon: AssessmentIcon,
    },
  ];

  const FloatingCard = ({ icon: Icon, title, description, style, rating = 5 }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: [0, -15, 0],
        x: [-5, 5, -5],
        transition: {
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          },
          x: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      }}
      style={{
        position: "absolute",
        ...style,
      }}
    >
      <Box
        sx={{
          p: 4,
          width: "300px",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Icon sx={{ fontSize: 28, color: colors.greenAccent[400] }} />
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontWeight: 600,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {title}
          </Typography>
        </Box>
        <Typography
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            lineHeight: 1.8,
            mb: 2,
          }}
        >
          {description}
        </Typography>
        <Box display="flex" gap={0.5}>
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              sx={{
                fontSize: 20,
                color: index < rating ? colors.greenAccent[400] : "rgba(255, 255, 255, 0.2)",
              }}
            />
          ))}
        </Box>
      </Box>
    </motion.div>
  );

  const StatCard = ({ number, text, style }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: [0, -15, 0],
        x: [-5, 5, -5],
        transition: {
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          },
          x: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      }}
      style={{
        position: "absolute",
        ...style,
      }}
    >
      <Box
        sx={{
          p: 3,
          width: "200px",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontWeight: 700,
            mb: 1,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {number}
        </Typography>
        <Typography
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            lineHeight: 1.6,
          }}
        >
          {text}
        </Typography>
      </Box>
    </motion.div>
  );

  const FeatureCard = ({ icon: Icon, title, description }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      style={{ height: "100%" }}
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
          transition: "all 0.3s ease",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
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
            width: 60,
            height: 60,
            borderRadius: "15px",
            background: "rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            transition: "all 0.3s ease",
          }}
        >
          <Icon
            sx={{
              fontSize: 32,
              color: colors.greenAccent[400],
            }}
          />
        </Box>
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: 600,
            mb: 2,
            fontFamily: "'Poppins', sans-serif",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: 0,
              width: 40,
              height: 3,
              background: `linear-gradient(135deg, ${colors.greenAccent[500]}, ${colors.blueAccent[400]})`,
              borderRadius: "2px",
            },
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            lineHeight: 1.6,
            flex: 1,
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
      style={{ height: "100%" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 3,
          p: 3,
          height: "100%",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          transition: "all 0.3s ease",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: -100,
            right: -100,
            width: 200,
            height: 200,
            background: `radial-gradient(circle, ${colors.greenAccent[500]}20, transparent 70%)`,
            transition: "all 0.3s ease",
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
              transform: "scale(1.2)",
            },
            "&::after": {
              opacity: 1,
              left: "100%",
              top: "100%",
            },
            "& .benefit-icon": {
              transform: "rotate(10deg) scale(1.1)",
              color: colors.greenAccent[300],
            },
          },
        }}
      >
        <Icon
          className="benefit-icon"
          sx={{
            fontSize: 40,
            color: colors.greenAccent[400],
            mt: 1,
            transition: "all 0.3s ease",
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontWeight: 600,
              mb: 1,
              fontFamily: "'Poppins', sans-serif",
              position: "relative",
              display: "inline-block",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -4,
                left: 0,
                width: "0%",
                height: 2,
                background: `linear-gradient(135deg, ${colors.greenAccent[500]}, ${colors.blueAccent[400]})`,
                transition: "width 0.3s ease",
              },
              "&:hover::after": {
                width: "100%",
              },
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
    <Box sx={{ 
      width: "100%",
      background: darkMode ? colors.primary[600] : 'white',
      color: darkMode ? 'white' : colors.grey[100],
    }}>
      <TopBarOfMarketing darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode 
            ? `linear-gradient(135deg, ${colors.primary[600]}, ${colors.greenAccent[700]})`
            : `linear-gradient(135deg, ${colors.primary[400]}, ${colors.greenAccent[500]})`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Hero Section */}
        <Container maxWidth="lg" sx={{ pt: 15, pb: 10 }}>
          <Grid container spacing={6} alignItems="center" sx={{ position: "relative", zIndex: 2 }}>
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

        {/* Floating Cards Section */}
        <Box
          sx={{
            display: { xs: "none", md: "block" }
          }}
        >
          <Box
            sx={{
              height: "400px",
              position: "relative",
              mt: 4,
            }}
          >
            <FloatingCard
              icon={MonitorHeartIcon}
              title="Dr. Ayşe Y."
              description="Ortopedi Uzmanı"
              rating={5}
              style={{
                position: "absolute",
                left: "5%",
                top: "10%"
              }}
            />
            <StatCard
              number="500+"
              text="Hastane istatistiği"
              style={{
                position: "absolute",
                left: "15%",
                top: "60%"
              }}
            />
            <FloatingCard
              icon={PsychologyIcon}
              title="Dr. Mehmet K."
              description="Fizik Tedavi Uzmanı"
              rating={4}
              style={{
                position: "absolute",
                left: "35%",
                top: "30%"
              }}
            />
            <StatCard
              number="1000+"
              text="Aktif Kullanıcı istatistiği"
              style={{
                position: "absolute",
                right: "35%",
                top: "65%"
              }}
            />
            <StatCard
              number="5000+"
              text="Hasta Takibi istatistiği"
              style={{
                position: "absolute",
                right: "15%",
                top: "15%"
              }}
            />
            <FloatingCard
              icon={TimelineIcon}
              title="Dr. Zeynep D."
              description="Nöroloji Uzmanı"
              rating={5}
              style={{
                position: "absolute",
                right: "5%",
                top: "50%"
              }}
            />
          </Box>
        </Box>

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

        {/* Testimonials Section */}
        <Container maxWidth="lg" sx={{ py: 12 }}>
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
              Kullanıcı Deneyimleri
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
              Sistemimizi kullanan sağlık profesyonellerinin görüşleri
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      p: 4,
                      borderRadius: "20px",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      height: "100%",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgba(255, 255, 255, 0.9)",
                        mb: 4,
                        fontSize: "1.1rem",
                        lineHeight: 1.6,
                        fontStyle: "italic",
                      }}
                    >
                      "{testimonial.comment}"
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: colors.greenAccent[500],
                        }}
                      >
                        {testimonial.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography
                          sx={{
                            color: "white",
                            fontWeight: 600,
                            fontSize: "1.1rem",
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: colors.greenAccent[400],
                            fontSize: "0.9rem",
                          }}
                        >
                          {testimonial.title}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Integration Section */}
        <Container maxWidth="lg" sx={{ py: 12 }}>
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
              Entegrasyonlar
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
              Popüler sağlık sistemleri ve cihazlarla sorunsuz entegrasyon
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {integrations.map((integration, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: "16px",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        background: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    <integration.icon sx={{ fontSize: 40, color: colors.greenAccent[400] }} />
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      {integration.name}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>

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
    </Box>
  );
}
