// App.jsx
import "./App.css";
import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PantallaAltaServicio from "./pages/PantallaAltaServicio";
import PantallaAltaTecnico from "./pages/PantallaAltaTecnico";
import PantallaLandingCliente from "./pages/PantallaLandingCliente";
import PantallaLandingTecnico from "./pages/PantallaLandingTecnico";
import PantallaLogin from "./pages/PantallaLogin";
import PantallaLandingAdmin from "./pages/PantallaLandingAdmin";
import PantallaVisualizacionDatosTecnico from "./pages/PantallaVisualizacionDatosTecnico";
import PantallaAgregarProducto from "./pages/PantallaAgregarProducto";
import { useRolSesion } from "./store/selectors";
import PantallaIngresarPresupuesto from "./pages/PantallaIngresarPresupuesto";
import PantallaEditarServicio from "./pages/PantallaEditarServicio";
import PantallaAltaFalla from "./pages/PantallaAltaFalla";
import PantallaVisualizacionFallas from "./pages/PantallaVisualizacionFallas";
import PantallaDetalleServicio from "./pages/PantallaDetalleServicio";
import PantallaHistoriaClinica from "./pages/PantallaHistoriaClinica";
import PantallaRecuperarContrasena from "./pages/PantallaRecuperarContrasena";
import PantallaListadoClientes from "./pages/PantallaListadoClientes";
import PantallaAltaAdmin from "./pages/PantallaAltaAdmin";
import PantallaListadoAdmins from "./pages/PantallaListadoAdmins";

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
        <Route
          path="/historiaClinica"
          element={
            <ProtectedRoute roles={["Tecnico", "Administrador"]}>
              <PantallaHistoriaClinica />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agregarProducto"
          element={
            <ProtectedRoute roles={["Tecnico", "Administrador"]}>
              <PantallaAgregarProducto />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nuevoservicio"
          element={
            <ProtectedRoute roles={["Tecnico"]}>
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
          path="/nuevoadmin"
          element={
            <ProtectedRoute roles={["Administrador"]}>
              <PantallaAltaAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tecnico/:idTecnico"
          element={
            <ProtectedRoute roles={["Administrador"]}>
              <PantallaVisualizacionDatosTecnico />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ingresarPresupuesto/:idServicio"
          element={
            <ProtectedRoute roles={["Tecnico", "Administrador"]}>
              <PantallaIngresarPresupuesto />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editarServicio/:idServicio"
          element={
            <ProtectedRoute roles={["Tecnico", "Administrador"]}>
              <PantallaEditarServicio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/altaFalla"
          element={
            <ProtectedRoute roles={["Tecnico", "Administrador"]}>
              <PantallaAltaFalla />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fallas"
          element={
            <ProtectedRoute roles={["Tecnico", "Administrador"]}>
              <PantallaVisualizacionFallas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/servicios/:idServicio"
          element={
            <ProtectedRoute roles={["Cliente", "Administrador", "Tecnico"]}>
              <PantallaDetalleServicio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cambiarContrasena"
          element={
            <ProtectedRoute roles={["Administrador", "Tecnico"]}>
              <PantallaRecuperarContrasena />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <ProtectedRoute roles={["Administrador", "Tecnico"]}>
              <PantallaListadoClientes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admins"
          element={
            <ProtectedRoute roles={["Administrador"]}>
              <PantallaListadoAdmins />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
