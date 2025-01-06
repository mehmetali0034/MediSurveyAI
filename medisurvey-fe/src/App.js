import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Li̇ne from "./scenes/line";
import Pie from "./scenes/pie";
import Faq from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar";
import Patients from "./scenes/patients";
import Files from "./scenes/files";
import Login from "./scenes/loginn";
import AddPatient from "./scenes/addpatient";
import Marketing from "./scenes/marketing";
import Sidebaar from "./scenes/global/SideBaar";
import Topbar from "./scenes/global/Topbar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            {/* Başlangıçta Marketing sayfasına yönlendirme */}
            <Route path="/" element={<Navigate to="/MediSurveyAI" />} />

            {/* Login rotası */}
            <Route path="/login" element={<Login />} />

            {/* Marketing sayfası, burada Sidebar ve Topbar'ı göstermiyoruz */}
            <Route path="/MediSurveyAI" element={<Marketing />} />

            {/* Giriş yapıldıktan sonraki sayfalar, Sidebar ve Topbar olacak */}
            <Route
              path="/*"
              element={
                <>
                  <Sidebaar isSidebar={isSidebar} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/team" element={<Team />} />
                      <Route path="/bar" element={<Bar />} />
                      <Route path="/patients" element={<Patients />} />
                      <Route path="/faq" element={<Faq />} />
                      <Route path="/addDoctor" element={<Form />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/geography" element={<Geography />} />
                      <Route path="/files" element={<Files />} />
                      <Route path="/line" element={<Li̇ne />} />
                      <Route path="/pie" element={<Pie />} />
                      <Route path="/AddPatient" element={<AddPatient />} />
                    </Routes>
                  </main>
                </>
              }
            />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
