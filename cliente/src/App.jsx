// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import HeaderHome from "./components/HeaderHome";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

import Persona from "./pages/Persona";
import Voluntario from "./pages/Voluntario";
import Tarea from "./pages/Tarea";
import Asignacion from "./pages/Asignacion";
import Registro from "./pages/Registro";

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Routes>
      <Route path="/" element={<HeaderHome><Home /></HeaderHome>} />
      <Route path="/login" element={<Login />} />
      
      {/* Solo Dashboard tiene el layout con Header y Sidebar */}
      <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />

      <Route path="/persona" element={<DashboardLayout><Persona /></DashboardLayout>} />
      <Route path="/voluntario" element={<DashboardLayout><Voluntario /></DashboardLayout>} />
      <Route path="/tarea" element={<DashboardLayout><Tarea /></DashboardLayout>} />
      <Route path="/asignacion" element={<DashboardLayout><Asignacion /></DashboardLayout>} />
      <Route path="/actividad" element={<DashboardLayout><Registro /></DashboardLayout>} />
    </Routes>
    </ThemeProvider>
  );
}

export default App;
