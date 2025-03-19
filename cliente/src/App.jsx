// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      
      {/* Solo Dashboard tiene el layout con Header y Sidebar */}
      <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
    </Routes>
    </ThemeProvider>
  );
}

export default App;
