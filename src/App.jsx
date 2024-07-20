// App.jsx
import "./App.css";
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PantallaAltaServicio from "./pages/PantallaAltaServicio";
import PantallaAltaTecnico from "./pages/PantallaAltaTecnico";
import PantallaLandingCliente from "./pages/PantallaLandingCliente";
import PantallaLandingTecnico from "./pages/PantallaLandingTecnico";
import PantallaLogin from "./pages/PantallaLogin";
//import PantallaMetricas from "./pages/PantallaMetricas";
import PantallaVisualizacionDatosTecnico from "./pages/PantallaVisualizacionDatosTecnico";
import { useRolSesion } from "./store/selectors";


const ProtectedRoute = ({ role, children }) => {
  const navigate = useNavigate();
  const rolSesion = useRolSesion();

  if (rolSesion !== role) {
    if (rolSesion === "Cliente") {
      navigate("/servicios");
    } else if (rolSesion === "Tecnico") {
      navigate("/serviciostecnico");
    } /*else if (rolSesion === "Administrador") {
      navigate("/metricas");
    } */else {
      navigate("/");
    }
    return null;
  }

  return children;
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PantallaLogin />} />
        <Route
          path="/nuevoservicio"
          element={
            <ProtectedRoute rol={"Tecnico" || "Administrador"}>
              <PantallaAltaServicio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/serviciostecnico"
          element={
            <ProtectedRoute rol={"Tecnico" || "Administrador"}>
              <PantallaLandingTecnico />
            </ProtectedRoute>
          }
        />
        {/*<Route
          path="/metricas"
          element={
            <ProtectedRoute rol={"Administrador"}>
              <PantallaMetricas />
            </ProtectedRoute>
          }
        />*/}
        
        <Route
          path="/servicios"
          element={
            <ProtectedRoute rol={"Cliente"}>
              <PantallaLandingCliente />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nuevotecnico"
          element={
            <ProtectedRoute rol={"Administrador"}>
              <PantallaAltaTecnico />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tecnico/:idTecnico"
          element={
            <ProtectedRoute rol={"Administrador"}>
              <PantallaVisualizacionDatosTecnico/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
//<Route path='/usuario/:userId' element={<PantallaUsuario />} />

/*
"/Login"
"/NuevoServicio"
"/ServiciosTecnico"
"/Metricas"
"/Servicios"
"/NuevoTecnico"
tambien agregar las que no sean por navbar, como landing pages
*/

export default App;
