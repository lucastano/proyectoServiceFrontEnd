// App.jsx
import "./App.css";
import React from "react";
import { FormularioAltaServicio } from "./components/FormularioAltaServicio/FormularioAltaServicio";
import { Route, Routes } from 'react-router-dom';
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  return (
    <div className="App">
       <Routes>
         <Route path='/' element={<PantallaLogin />} />
         <Route path='/nuevoservicio' element={<PantallaAltaServicio/>} />
         <Route path='/serviciostecnico' element={<PantallaLandingTecnico/>} />
         <Route path='/metricas' element={<PantallaMetricas/>} />
         <Route path='/servicios' element={<PantallaLandingCliente/>} />
         <Route path='/nuevotecnico' element={<PantallaAltaTecnico/>} />
         <Route path='/tecnico/:idTecnico' element={<PantallaVisualizacionDatosTecnico idTecnico={idTecnico} />} />
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