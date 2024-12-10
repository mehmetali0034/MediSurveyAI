import { useState } from "react";
import Topbar from "./scenes/global/Topbar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material"; //CssBaseline, uygulamanın temel CSS reset'ini sağlar. Tarayıcıdan tarayıcıya farklılık gösteren bazı varsayılan tarayıcı stillerini sıfırlayarak, MUI'nin bileşenlerini daha tutarlı bir şekilde göstermeye yardımcı olur.
import Sidebaar from "./scenes/global/SideBaar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Li̇ne from "./scenes/line";
import Pie from "./scenes/pie";
import Faq from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar"
import Patients from "./scenes/patients";
import Files from "./scenes/files";


function App() {
  const [theme, colorMode] = useMode();
  /*Color mode benim thema arka planını değiştirmemi tetikleyen fonksiyondur. Bunu useContext ile kulalnığım zaman artık her yerden buna 
  erişebilecek duruma geleceğim. Bunu içerimde olan Topbarda kullnıp topbardaki icına tıkayınca themanın değişmesini sağlayacağım.
  */
  //CssBaseline bileşeni, tarayıcıların varsayılan stillerini sıfırlar ve MUI'nin tema özelliklerini uygular.
  const [isSidebar, setIsSidebar] = useState(true);
  //Aşağıda  <ColorModeContext.Provider value={colorMode}>  kullandım use contect içerisindeki colorModa useContext aracışlığıyla her yerden
  //ulaşabilceğim .colorMod benim renk değiştirme fonksiyonumu tektikliyor.Yani istediğim yerden useCntext aracığlığıyla renk değiştirme
  //fonksiyonumu tetikleyebilirm.
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebaar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/form" element={<Form />} />
              <Route path="/calendar" element={<Calendar/>}/>
              <Route path="/geography" element={<Geography />} />
              <Route path="/files" element={<Files />} />
              <Route path="/line" element={<Li̇ne/>} />
              <Route path="/pie" element={<Pie />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
