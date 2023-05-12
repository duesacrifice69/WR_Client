import React from "react";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  BrowserRouter,
} from "react-router-dom";
import { themeSettings } from "./theme";
import { useMemo } from "react";

import Auth from "./components/Auth/Auth";
import { useSelector } from "react-redux";
import Dashboard from "./Pages/Dashboard";
import Company from "./Pages/Company/Company";
import Layout from "./Pages/Layout";
import Vehicle from "./Pages/Vehicle/Vehicle";

const App = () => {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route element={<Layout />}>
              <Route path="/home" element={<Dashboard />} />
              <Route path="/company" element={<Company />} />
              <Route path="/vehicle" element={<Vehicle />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
