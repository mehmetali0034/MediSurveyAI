import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import Faq from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar";
import Patients from "./scenes/patients";
import Files from "./scenes/files";
import AddPatient from "./scenes/addpatient";
import Marketing from "./scenes/marketing";
import About from "./scenes/about";
import Contact from "./scenes/contact";
import SidebarComponent from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import TenantRegister from "./scenes/register/TenantRegister";
import CorporateLogin from "./scenes/loginn/CorporateLogin";
import IndividualLogin from "./scenes/loginn/IndividualLogin";
import TenDashboard from "./scenes/dashboard/TenDashboard";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{ height: "100%" }}>
          <Routes>
            <Route
              path="/"
              element={
                <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", overflow: "auto" }}>
                  <Marketing darkMode={darkMode} setDarkMode={setDarkMode} />
                </Box>
              }
            />
            <Route
              path="/individual-login"
              element={
                <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", overflow: "auto" }}>
                  <IndividualLogin darkMode={darkMode} setDarkMode={setDarkMode} />
                </Box>
              }
            />
            <Route
              path="/corporate-login"
              element={
                <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", overflow: "auto" }}>
                  <CorporateLogin darkMode={darkMode} setDarkMode={setDarkMode} />
                </Box>
              }
            />
            <Route
              path="/register/tenant"
              element={
                <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", overflow: "auto" }}>
                  <TenantRegister darkMode={darkMode} setDarkMode={setDarkMode} />
                </Box>
              }
            />
            <Route
              path="/about"
              element={
                <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", overflow: "auto" }}>
                  <About darkMode={darkMode} setDarkMode={setDarkMode} />
                </Box>
              }
            />
            <Route
              path="/contact"
              element={
                <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", overflow: "auto" }}>
                  <Contact darkMode={darkMode} setDarkMode={setDarkMode} />
                </Box>
              }
            />
            <Route path="/tenant/dashboard" element={<TenDashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route
              path="/*"
              element={
                <>
                  <SidebarComponent isSidebar={isSidebar} darkMode={darkMode} setDarkMode={setDarkMode} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
                      <Route path="/team" element={<Team darkMode={darkMode} setDarkMode={setDarkMode} />} />
                      <Route path="/bar" element={<Bar darkMode={darkMode} setDarkMode={setDarkMode} />} />
                      <Route path="/patients" element={<Patients darkMode={darkMode} setDarkMode={setDarkMode} />} />
                      <Route path="/faq" element={<Faq darkMode={darkMode} setDarkMode={setDarkMode} />} />
                      <Route path="/addDoctor" element={<Form darkMode={darkMode} setDarkMode={setDarkMode} />} />
                      <Route path="/calendar" element={<Calendar darkMode={darkMode} setDarkMode={setDarkMode} />} />
                      <Route path="/geography" element={<Geography darkMode={darkMode} setDarkMode={setDarkMode} />} />
                      <Route path="/files" element={<Files darkMode={darkMode} setDarkMode={setDarkMode} />} />
                      <Route path="/line" element={<Line darkMode={darkMode} setDarkMode={setDarkMode} />} />
                      <Route path="/pie" element={<Pie darkMode={darkMode} setDarkMode={setDarkMode} />} />
                      <Route path="/AddPatient" element={<AddPatient darkMode={darkMode} setDarkMode={setDarkMode} />} />
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
