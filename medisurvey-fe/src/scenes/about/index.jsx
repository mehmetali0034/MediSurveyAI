import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import { motion } from "framer-motion";
import TopBarOfMarketing from "../../components/TopBarOfMarketing";
import Footer from "../../components/Footer";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PeopleIcon from '@mui/icons-material/People';

export default function About({ darkMode, setDarkMode }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const TeamMember = ({ name, role, description }) => (
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
          borderRadius: "24px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          transition: "all 0.3s ease",
          height: "100%",
          display: "flex",
          flexDirection: "column",
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
            transform: "translateY(-10px)",
            "&::before": {
              transform: "scale(1.2)",
            },
            "&::after": {
              opacity: 1,
              left: "100%",
              top: "100%",
            },
          },
        }}
      >
        <Typography
          variant="h4"
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
              transition: "width 0.3s ease",
            },
            "&:hover::after": {
              width: "100%",
            },
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: colors.greenAccent[400],
            mb: 2,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {role}
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
      </Box>
    </motion.div>
  );

  const ValueCard = ({ icon: Icon, title, description }) => (
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
          borderRadius: "24px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          transition: "all 0.3s ease",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
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
            width: 70,
            height: 70,
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            transition: "all 0.3s ease",
          }}
        >
          <Icon sx={{ fontSize: 48, color: colors.greenAccent[400], transition: "all 0.3s ease" }} />
        </Box>
        <Typography
          variant="h4"
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
      </Box>
    </motion.div>
  );

  return (
    <Box sx={{ 
      width: "100%",
      background: darkMode ? colors.primary[500] : 'white',
      color: darkMode ? 'white' : colors.grey[100],
    }}>
      <TopBarOfMarketing darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode 
            ? `linear-gradient(135deg, ${colors.primary[600]}, ${colors.greenAccent[700]})`
            : `linear-gradient(135deg, ${colors.primary[400]}, ${colors.greenAccent[500]})`,
          pt: "64px",
        }}
      >
        {/* About Us Section */}
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
              Hakkımızda
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
              MediSurvey AI olarak, sağlık sektöründe dijital dönüşümün öncüsü olmayı hedefliyoruz. Modern teknolojilerle desteklenen platformumuz, sağlık hizmetlerini daha verimli ve erişilebilir kılıyor.
            </Typography>
          </motion.div>

          {/* Values Section */}
          <Grid container spacing={4} sx={{ mb: 12 }}>
            <Grid item xs={12} md={6} lg={3}>
              <ValueCard
                icon={MedicalServicesIcon}
                title="Misyonumuz"
                description="Sağlık hizmetlerini dijitalleştirerek, hasta takibini ve tedavi süreçlerini daha verimli hale getirmek."
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <ValueCard
                icon={VisibilityIcon}
                title="Vizyonumuz"
                description="Sağlık sektöründe dijital dönüşümün öncüsü olarak, global ölçekte hizmet veren bir teknoloji şirketi olmak."
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <ValueCard
                icon={RocketLaunchIcon}
                title="Hedeflerimiz"
                description="Yapay zeka ve modern teknolojilerle sağlık hizmetlerini geliştirmek ve herkes için erişilebilir kılmak."
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <ValueCard
                icon={PeopleIcon}
                title="Değerlerimiz"
                description="Yenilikçilik, güvenilirlik, şeffaflık ve hasta odaklı yaklaşım temel değerlerimizi oluşturur."
              />
            </Grid>
          </Grid>

          {/* Team Section */}
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: 600,
              textAlign: "center",
              mb: 8,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Ekibimiz
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <TeamMember
                name="Dr. Ahmet Yılmaz"
                role="Kurucu & CEO"
                description="20 yıllık tıp ve teknoloji deneyimi ile sağlık sektöründe dijital dönüşümün öncülerinden."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TeamMember
                name="Ayşe Kaya"
                role="Teknoloji Direktörü"
                description="Yapay zeka ve makine öğrenimi alanında uzman, 15 yıllık yazılım geliştirme deneyimi."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TeamMember
                name="Mehmet Demir"
                role="Ürün Müdürü"
                description="Kullanıcı deneyimi ve ürün geliştirme konusunda uzman, sağlık teknolojileri alanında 10 yıllık tecrübe."
              />
            </Grid>
          </Grid>
        </Container>

        {/* Stats Section */}
        <Box
          sx={{
            py: 12,
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Box sx={{ textAlign: "center", color: "white" }}>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        background: `linear-gradient(135deg, ${colors.greenAccent[300]}, ${colors.blueAccent[200]})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      5+
                    </Typography>
                    <Typography variant="h5">Yıllık Deneyim</Typography>
                  </Box>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box sx={{ textAlign: "center", color: "white" }}>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        background: `linear-gradient(135deg, ${colors.greenAccent[300]}, ${colors.blueAccent[200]})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      50+
                    </Typography>
                    <Typography variant="h5">Uzman Çalışan</Typography>
                  </Box>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Box sx={{ textAlign: "center", color: "white" }}>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        background: `linear-gradient(135deg, ${colors.greenAccent[300]}, ${colors.blueAccent[200]})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      1000+
                    </Typography>
                    <Typography variant="h5">Mutlu Müşteri</Typography>
                  </Box>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Box sx={{ textAlign: "center", color: "white" }}>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        background: `linear-gradient(135deg, ${colors.greenAccent[300]}, ${colors.blueAccent[200]})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      24/7
                    </Typography>
                    <Typography variant="h5">Destek</Typography>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
} 