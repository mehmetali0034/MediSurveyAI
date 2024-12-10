import { Box, Button, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";//Genel olarak, eğer basit bir giriş alanına ihtiyacınız varsa ve ek özellikler veya stilleme yapmak istemiyorsanız, TextField kullanmak daha uygun olabilir. Ancak, özel bir tasarım veya daha fazla kontrol istiyorsanız, InputBase kullanabilirsiniz.Genellikle özel bir tasarım veya ek özellikler eklemek istediğinizde kullanılır.
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  //Material-UI'da useTheme hook'u, tema (theme) nesnesine erişmenizi sağlar. Bu hook'u kullanarak, ThemeProvider içinde olmasanız
  //bile tema özelliklerine erişebilirsiniz.Yani themeyı yakalıyor. useTheme hook'u, ThemeProvider tarafından sağlanan temayı almanıza yardımcı olur.
  const colors = tokens(theme.palette.mode);//Yani dark başlangıç olarak dark sonrasında colorMode her tetiklendi*ğinde değişecek
  const colorMode = useContext(ColorModeContext);//Bu şekilde colorMode değerimi ColorModeContext.Provider'ın valuusu içerisindeki colorMode ' a eşitledim. colorMode kullanarak ColorModeContext içerisine yazdığın value değerine ulaşabileceğim
// justifyContent="space-between" asıl özellliği içerisindeki ilk öğe ,ile son öğre arasındaki mesafeyi max yapmaktır.P={2} diyerekte içeriği etrafında bir kenar boşluğu (padding) ekler. p özelliği, tüm kenarlarına aynı kenar boşluğunu uygular.
//DarkButtona tıklandığı zaman colorMode.toggleColorMode fonksiyonu tetiklenecektir.
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex" >
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;