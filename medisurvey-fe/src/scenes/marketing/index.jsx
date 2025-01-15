import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import TopBarOfMarketing from "../../components/TopBarOfMarketing";
import { tokens } from "../../theme";
import MouseIcon from '@mui/icons-material/Mouse';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

export default function Marketing() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{ width: "100%" }}>
      <TopBarOfMarketing />

      <Box sx={{ display: "flex", height: "45vh" }}>
        <Box
          flex={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Yukarıdan aşağıya ortalama
            alignItems: "center", // Yatayda ortalama
          }}
        >
          <Typography
            sx={{ textAlign: "center", fontFamily: "serif" }}
            variant="h1"
          >
            “Her An, Her Yerde <br /> Hasta Takibi Artık Çok Kolay!”
          </Typography>
        </Box>

        <Box
          flex={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Yukarıdan aşağıya ortalama
            alignItems: "center", // Yatayda ortalama
          }}
        >
          <img
            style={{ height: "auto", width: "50%" }}
            src={`../../../assets/ComputerPhoto.png`}
          />
        </Box>
      </Box>
      <Box sx={{ margin: 5 }}>
        <Grid sx={{ marginLeft: 2 }} container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "20px",
                textAlign: "center",
                alignItems: "center",
                borderRadius: 5,
                backgroundColor: colors.greenAccent[600],
                height: "200px",
                width: "80%",
              }}
            >
              <Typography sx={{ fontFamily: "serif" }} variant="h3">
                Tedavi Süreçlerini Elinizin Altında Tutun
              </Typography>
              <HealthAndSafetyIcon sx={{marginTop:3}}/>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                padding: "20px",
                textAlign: "center",
                borderRadius: 5,
                backgroundColor: colors.greenAccent[600],
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "20px",
                textAlign: "center",
                alignItems: "center",
                height: "200px",
                width: "80%",
              }}
            >
              <Typography sx={{ fontFamily: "serif" }} variant="h3">
                Hasta Verilerinizi Kolayca Yönetin!
              </Typography>
              <CheckCircleIcon sx={{marginTop:3}}/>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                padding: "20px",
                backgroundColor: colors.greenAccent[600],
                textAlign: "center",
                borderRadius: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "20px",
                textAlign: "center",
                alignItems: "center",
                height: "200px",
                width: "80%",
              }}
            >
              <Typography sx={{ fontFamily: "serif" }} variant="h3">
                Tüm Tedavi Süreçlerini Grafiksel Olarak Görüntüleyin
              </Typography>
              <BarChartIcon sx={{marginTop:3}}/>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                textAlign: "center",
                padding: "20px",
                backgroundColor: colors.greenAccent[600],
                textAlign: "center",
                borderRadius: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "20px",
                textAlign: "center",
                alignItems: "center",
                height: "200px",
                width: "80%",
              }}
            >
              <Typography sx={{ fontFamily: "serif" }} variant="h3">
                Hasta İle Aranıza Mesafe Girmesin
              </Typography>
              <MouseIcon sx={{marginTop:3}}/>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
