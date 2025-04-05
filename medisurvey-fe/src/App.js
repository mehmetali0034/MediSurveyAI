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
import AddPatient from "./scenes/addpatient";
import Marketing from "./scenes/marketing";
import Sidebaar from "./scenes/global/SideBaar";
import Topbar from "./scenes/global/Topbar";
import TenantRegister from "./scenes/register/TenantRegister";
import CorporateLogin from "./scenes/loginn/CorporateLogin";
import IndividualLogin from "./scenes/loginn/IndividualLogin";
import TenDashboard from "./scenes/dashboard/TenDashboard";
import TenantProfile from "./scenes/profile/tenantProfile"
import CreateNewFile from "./scenes/createFile"
import TenantDoctors from "./scenes/tenant-doctors"
import TenantPatients from "./scenes/tenant-patients"
import TenantsDoctorProfile from "./scenes/profile/tenantsDoctorProfile"
import TenantsPatientProfile from "./scenes/profile/TenantsPatientProfile";
import CreateNewForm from "./scenes/createForm"




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
            <Route path="/individual-login" element={<IndividualLogin />} />
            <Route path="/corporate-login" element={<CorporateLogin />} />
            <Route path="/MediSurveyAI" element={<Marketing />} />
            <Route path="/tenantRegister" element={<TenantRegister />} />
            <Route path="/tenant/dashboard" element={<TenDashboard />} />
            <Route path="/tenant/profile" element={<TenantProfile/>}/>
            <Route path="/tenant/doctors" element={<TenantDoctors/>}/>
            <Route path="/tenant/patients" element={<TenantPatients/>}/>
            <Route path="/tenant/doctors/:id" element={<TenantsDoctorProfile/>}/>
            <Route path="/tenant/patients/:id" element={<TenantsPatientProfile/>}/>
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
                      <Route path="/Create-NewFile" element={<CreateNewFile/>} />
                      <Route path="/Create-NewForm" element={<CreateNewForm/>} />
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
