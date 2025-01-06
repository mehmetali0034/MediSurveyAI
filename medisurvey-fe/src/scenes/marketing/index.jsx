import React from "react";
import { Container, Button, Typography, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/TopBarOfMarketing";
import BottomBar from "../../components/BottomBarOfMarketing";

export default function Marketing() {


  return (
    <Box style={{ width: "100vw", backgroundColor: "#1a1a2e", color: "white" }}>
      <Topbar />

      {/* Marketing sayfasının ana içeriği */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "5px",
          minHeight: "100vh",
          marginTop:"10px"
        }}
      >
        {/* Üst Kısım: Başlık ve Görsel */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "1200px",
            marginBottom: "40px",
          }}
        >
          {/* Sol taraf: Yazı */}
          <Box sx={{ flex: 1, textAlign: "left", marginRight: "20px" }}>
            <Typography variant="h2" gutterBottom>
              “Her an, her yerde
            </Typography>
            <Typography variant="h2" gutterBottom>
              hasta takibi artık çok kolay!”
            </Typography>
          </Box>

          {/* Sağ taraf: Resim */}
          <Box sx={{ flex: 1, textAlign: "right" }}>
            <img
              alt="computer-photo"
              width="300px"
              height="auto"
              src={`/assets/klinik-hasta-takip-programi.jpg`}
            />
          </Box>
        </Box>

        {/* Alt Kısım: Özellikler */}
        <Grid container spacing={4} sx={{ width: "100%" }}>
          {[
            {
              text: "Tedavi Süreçlerini Elinizin Altında Tutun",
              icon: "🔵",
            },
            {
              text: "Hasta Verilerinizi Kolayca Yönetin!",
              icon: "🔗",
            },
            {
              text: "Tüm Tedavi Süreçlerini Grafiksel Olarak Görüntüleyin",
              icon: "📊",
            },
            {
              text: "Hasta ile Aranıza Mesafe Girmesin!",
              icon: "🖥️",
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  backgroundColor: "#2e2e44",
                  borderRadius: "8px",
                  padding: "20px",
                  textAlign: "center",
                  color: "white",
                  width: "100%",
                }}
              >
                <Typography variant="h3" gutterBottom>
                  {item.icon}
                </Typography>
                <Typography variant="h3">{item.text}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <BottomBar />
    </Box>
  );
}
