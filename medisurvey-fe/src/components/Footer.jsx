import { Box, Container, Grid, Typography, Button, IconButton, Link, useTheme, TextField } from "@mui/material";
import { tokens } from "../theme";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${colors.primary[400]}, ${colors.greenAccent[500]})`,
        color: "white",
        mt: 8,
        pt: 8,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                mb: 2,
              }}
            >
              MEDISURVEY AI
            </Typography>
            <Typography
              variant="body1"
              sx={{
                opacity: 0.8,
                mb: 3,
                maxWidth: "300px",
              }}
            >
              Modern sağlık yönetimi için güçlü ve kullanıcı dostu platform. Her zaman yanınızda.
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton
                sx={{
                  color: "white",
                  "&:hover": {
                    background: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: "white",
                  "&:hover": {
                    background: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: "white",
                  "&:hover": {
                    background: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: "white",
                  "&:hover": {
                    background: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                mb: 2,
              }}
            >
              Ürün
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="#"
                sx={{
                  color: "white",
                  opacity: 0.8,
                  textDecoration: "none",
                  "&:hover": { opacity: 1 },
                }}
              >
                Özellikler
              </Link>
              <Link
                href="#"
                sx={{
                  color: "white",
                  opacity: 0.8,
                  textDecoration: "none",
                  "&:hover": { opacity: 1 },
                }}
              >
                Fiyatlandırma
              </Link>
              <Link
                href="#"
                sx={{
                  color: "white",
                  opacity: 0.8,
                  textDecoration: "none",
                  "&:hover": { opacity: 1 },
                }}
              >
                Entegrasyonlar
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                mb: 2,
              }}
            >
              Şirket
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="#"
                sx={{
                  color: "white",
                  opacity: 0.8,
                  textDecoration: "none",
                  "&:hover": { opacity: 1 },
                }}
              >
                Hakkımızda
              </Link>
              <Link
                href="#"
                sx={{
                  color: "white",
                  opacity: 0.8,
                  textDecoration: "none",
                  "&:hover": { opacity: 1 },
                }}
              >
                Kariyer
              </Link>
              <Link
                href="#"
                sx={{
                  color: "white",
                  opacity: 0.8,
                  textDecoration: "none",
                  "&:hover": { opacity: 1 },
                }}
              >
                İletişim
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                mb: 2,
              }}
            >
              Bültenimize Katılın
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.8,
                mb: 2,
              }}
            >
              En son güncellemeler ve haberler için bültenimize abone olun.
            </Typography>
            <Box
              component="form"
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "stretch",
              }}
            >
              <TextField
                type="email"
                placeholder="E-posta adresiniz"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "12px",
                    height: "48px",
                    transition: "all 0.3s ease-in-out",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      },
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.greenAccent[500],
                      },
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "transparent",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "white",
                    "&::placeholder": {
                      color: "rgba(255, 255, 255, 0.7)",
                      opacity: 1,
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  background: `linear-gradient(135deg, ${colors.greenAccent[500]}, ${colors.greenAccent[600]})`,
                  color: "white",
                  borderRadius: "12px",
                  padding: "12px 24px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textTransform: "none",
                  minWidth: { xs: "100%", sm: "150px" },
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    background: `linear-gradient(135deg, ${colors.greenAccent[600]}, ${colors.greenAccent[700]})`,
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  },
                  "&:active": {
                    transform: "translateY(0)",
                  },
                }}
              >
                Abone Ol
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            mt: 6,
            pt: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © 2024 MediSurvey AI. Tüm hakları saklıdır.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
} 