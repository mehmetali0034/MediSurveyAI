import { useTheme } from "@emotion/react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Container,
  useScrollTrigger,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  Switch,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { motion } from "framer-motion";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";

function ElevationScroll(props) {
  const { children, darkMode } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      backgroundColor: trigger 
        ? darkMode 
          ? 'rgba(0, 0, 0, 0.95)' 
          : 'rgba(255, 255, 255, 0.95)'
        : darkMode 
          ? 'rgba(0, 0, 0, 0.8)' 
          : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease-in-out',
    },
  });
}

export default function TopBarOfMarketing({ darkMode, setDarkMode }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expandedMenuItem, setExpandedMenuItem] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuItemClick = (itemText) => {
    if (itemText === 'Giriş Yap') {
      handleMenuOpen();
    } else {
      handleMenuClose();
    }
  };

  const menuItems = [
    { text: 'Anasayfa', icon: <HomeIcon />, onClick: () => navigate('/') },
    { text: 'Hakkımızda', icon: <InfoIcon />, onClick: () => navigate('/about') },
    { text: 'İletişim', icon: <ContactsOutlinedIcon />, onClick: () => navigate('/contact') },
    { text: 'Kayıt Ol', icon: <ShoppingCartIcon />, onClick: () => navigate('/register/tenant') },
  ];

  const loginItems = [
    { text: 'Bireysel Giriş', icon: <PersonIcon />, onClick: () => navigate('/individual-login') },
    { text: 'Kurumsal Giriş', icon: <BusinessIcon />, onClick: () => navigate('/corporate-login') },
  ];

  const drawer = (
    <Box 
      sx={{ 
        width: 280,
        height: '100%',
        background: darkMode ? colors.primary[500] : 'white',
        color: darkMode ? 'white' : colors.grey[500],
      }}
    >
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            background: `linear-gradient(135deg, ${colors.blueAccent[400]}, ${colors.greenAccent[500]})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.5px",
          }}
        >
          MEDISURVEY AI
        </Typography>
      </Box>
      <Divider sx={{ mb: 2, opacity: 0.1 }} />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => {
              item.onClick();
              setDrawerOpen(false);
            }}
            sx={{
              my: 1,
              mx: 2,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              }
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}

        <Divider sx={{ my: 2, opacity: 0.1 }} />
        
        <Typography
          variant="subtitle2"
          sx={{
            px: 3,
            mb: 1,
            color: darkMode ? 'rgba(255,255,255,0.5)' : colors.grey[400],
            fontWeight: 600,
          }}
        >
          Giriş Yap
        </Typography>

        {loginItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => {
              item.onClick();
              setDrawerOpen(false);
            }}
            sx={{
              my: 1,
              mx: 2,
              borderRadius: 2,
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
              '&:hover': {
                backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                transform: 'translateX(5px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                sx: {
                  fontWeight: 600,
                  fontSize: '0.95rem',
                }
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 2 }}>
        <Divider sx={{ mb: 2, opacity: 0.1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2 }}>
          <Typography variant="body2" sx={{ color: darkMode ? 'rgba(255,255,255,0.7)' : colors.grey[500] }}>
            {darkMode ? 'Gece Modu' : 'Gündüz Modu'}
          </Typography>
          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            sx={{
              position: 'relative',
              width: 36,
              height: 36,
              borderRadius: '10px',
              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease-in-out',
              overflow: 'hidden',
              '&:hover': {
                background: darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
                transform: 'translateY(-2px)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, ${colors.blueAccent[400]}, ${colors.greenAccent[500]})`,
                opacity: 0,
                transition: 'opacity 0.3s ease-in-out',
              },
              '&:hover::before': {
                opacity: 0.1,
              }
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <motion.div
                initial={{ scale: 1, rotate: 0 }}
                animate={{ 
                  scale: [1, 0.8, 1],
                  rotate: darkMode ? 360 : 0
                }}
                transition={{ duration: 0.5 }}
              >
                {darkMode ? (
                  <DarkModeIcon 
                    sx={{ 
                      color: 'white',
                      fontSize: '1.2rem',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                    }} 
                  />
                ) : (
                  <LightModeIcon 
                    sx={{ 
                      color: colors.grey[500],
                      fontSize: '1.2rem',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                    }} 
                  />
                )}
              </motion.div>
            </Box>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );

  return (
    <ElevationScroll darkMode={darkMode}>
      <AppBar 
        position="fixed" 
        sx={{ 
          width: "100%", 
          zIndex: 1000,
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          background: darkMode 
            ? 'rgba(0, 0, 0, 0.7)' 
            : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Button 
                onClick={() => navigate("/")} 
                sx={{ 
                  p: 0,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -2,
                    left: 0,
                    width: '100%',
                    height: 2,
                    background: `linear-gradient(90deg, ${colors.greenAccent[500]}, ${colors.blueAccent[400]})`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover::after': {
                    opacity: 1,
                  },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${colors.greenAccent[500]}, ${colors.blueAccent[400]})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "0.5px",
                  }}
                >
                  MEDISURVEY AI
                </Typography>
              </Button>
            </motion.div>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {!isMobile && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box display="flex" alignItems="center" gap={3}>
                    {menuItems.map((item) => (
                      <Button
                        key={item.text}
                        variant="text"
                        onClick={item.onClick}
                        sx={{
                          color: darkMode ? 'white' : colors.grey[800],
                          fontSize: "0.95rem",
                          fontWeight: 600,
                          padding: "8px 16px",
                          borderRadius: "12px",
                          position: 'relative',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: `linear-gradient(135deg, ${colors.greenAccent[500]}20, ${colors.blueAccent[400]}20)`,
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                          },
                          '&:hover': {
                            background: 'transparent',
                            transform: 'translateY(-2px)',
                            color: colors.greenAccent[500],
                          },
                          '&:hover::before': {
                            opacity: 1,
                          },
                        }}
                      >
                        {item.text}
                      </Button>
                    ))}

                    <Button
                      onClick={handleMenuOpen}
                      variant="contained"
                      endIcon={<ArrowDropDownIcon />}
                      sx={{
                        background: `linear-gradient(135deg, ${colors.greenAccent[500]}, ${colors.blueAccent[400]})`,
                        color: 'white',
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        padding: "10px 24px",
                        borderRadius: "12px",
                        textTransform: 'none',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        '&:hover': {
                          background: `linear-gradient(135deg, ${colors.greenAccent[600]}, ${colors.blueAccent[500]})`,
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                        },
                      }}
                    >
                      Giriş Yap
                    </Button>

                    <IconButton
                      onClick={() => setDarkMode(!darkMode)}
                      sx={{
                        position: 'relative',
                        width: 40,
                        height: 40,
                        borderRadius: '12px',
                        background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        overflow: 'hidden',
                        ml: 2,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          background: darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: `linear-gradient(135deg, ${colors.greenAccent[500]}20, ${colors.blueAccent[400]}20)`,
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        },
                        '&:hover::before': {
                          opacity: 1,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <motion.div
                          initial={{ scale: 1, rotate: 0 }}
                          animate={{ 
                            scale: [1, 0.8, 1],
                            rotate: darkMode ? 360 : 0
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          {darkMode ? (
                            <DarkModeIcon 
                              sx={{ 
                                color: 'white',
                                fontSize: '1.3rem',
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                              }} 
                            />
                          ) : (
                            <LightModeIcon 
                              sx={{ 
                                color: colors.grey[700],
                                fontSize: '1.3rem',
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                              }} 
                            />
                          )}
                        </motion.div>
                      </Box>
                    </IconButton>
                  </Box>
                </motion.div>
              )}

              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{ 
                    position: 'relative',
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      background: darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(135deg, ${colors.greenAccent[500]}20, ${colors.blueAccent[400]}20)`,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover::before': {
                      opacity: 1,
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ 
                        scale: drawerOpen ? [1, 0.8, 1] : 1,
                        rotate: drawerOpen ? 180 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <MenuIcon 
                        sx={{ 
                          color: darkMode ? 'white' : colors.grey[700],
                          fontSize: '1.3rem',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                        }} 
                      />
                    </motion.div>
                  </Box>
                </IconButton>
              )}
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  borderRadius: 2,
                  background: darkMode ? colors.primary[400] : 'white',
                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                  "& .MuiList-root": {
                    padding: 1,
                  },
                  minWidth: '200px',
                },
              }}
            >
              <Divider sx={{ my: 1 }} />
              
              {loginItems.map((item) => (
                <MenuItem
                  key={item.text}
                  onClick={() => {
                    item.onClick();
                    handleMenuClose();
                  }}
                  sx={{
                    color: darkMode ? 'white' : colors.grey[800],
                    padding: "12px 24px",
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    transition: 'all 0.3s ease',
                    backgroundColor: item.text === 'Bireysel Giriş' ? '#8B5CF6' : '#2DD4BF',
                    color: 'white',
                    margin: '4px 8px',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: item.text === 'Bireysel Giriş' ? '#7C3AED' : '#14B8A6',
                      transform: 'translateY(-2px)',
                      boxShadow: item.text === 'Bireysel Giriş' 
                        ? '0 4px 12px rgba(139,92,246,0.3)' 
                        : '0 4px 12px rgba(45,212,191,0.3)',
                    },
                  }}
                >
                  {React.cloneElement(item.icon, {
                    sx: { color: 'white' }
                  })}
                  <Typography
                    sx={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'white'
                    }}
                  >
                    {item.text}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              PaperProps={{
                sx: {
                  width: 280,
                  background: darkMode ? colors.primary[500] : 'white',
                }
              }}
            >
              {drawer}
            </Drawer>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
}
