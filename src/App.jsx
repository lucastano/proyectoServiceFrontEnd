// App.jsx
import "./App.css";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PantallaAltaServicio from "./pages/PantallaAltaServicio";
import PantallaAltaTecnico from "./pages/PantallaAltaTecnico";
import PantallaLandingCliente from "./pages/PantallaLandingCliente";
import PantallaLandingTecnico from "./pages/PantallaLandingTecnico";
import PantallaLogin from "./pages/PantallaLogin";
import PantallaLandingAdmin from "./pages/PantallaLandingAdmin";
import PantallaVisualizacionDatosTecnico from "./pages/PantallaVisualizacionDatosTecnico";
import { useRolSesion } from "./store/selectors";

const ProtectedRoute = ({ roles, children }) => {
  const rolSesion = useRolSesion();

  if (!roles.includes(rolSesion)) {
    if (rolSesion === "Cliente") {
      return <Navigate to="/servicios" />;
    } else if (rolSesion === "Tecnico") {
      return <Navigate to="/serviciostecnico" />;
    } else if (rolSesion === "Administrador") {
      return <Navigate to="/metricas" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return children;
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PantallaLogin />} />
        <Route path="/historiaClinica" element={
            <ProtectedRoute roles={["Tecnico", "Administrador"]}>
              <PantallaAltaServicio />
            </ProtectedRoute>
          }/>
        <Route
          path="/nuevoservicio"
          element={
            <ProtectedRoute roles={["Tecnico", "Administrador"]}>
              <PantallaAltaServicio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/serviciostecnico"
          element={
            <ProtectedRoute roles={["Tecnico", "Administrador"]}>
              <PantallaLandingTecnico />
            </ProtectedRoute>
          }
        />
        <Route
          path="/metricas"
          element={
            <ProtectedRoute roles={["Administrador"]}>
              <PantallaLandingAdmin />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/servicios"
          element={
            <ProtectedRoute roles={["Cliente"]}>
              <PantallaLandingCliente />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nuevotecnico"
          element={
            <ProtectedRoute roles={["Administrador"]}>
              <PantallaAltaTecnico />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tecnico/:idTecnico"
          element={
            <ProtectedRoute roles={["Administrador"]}>
              <PantallaVisualizacionDatosTecnico/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;