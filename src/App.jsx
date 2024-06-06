// App.jsx
import "./App.css";
import React from "react";
import { ContenedorOpcionesLogin } from "./components/ContenedorOpcionesLogin/ContenedorOpcionesLogin";
import { FormularioAltaCliente } from "./components/FormularioAltaCliente/FormularioAltaCliente";
import { FormularioAltaServicio } from "./components/FormularioAltaServicio/FormularioAltaServicio";

function App() {
  return (
    <div className="w-screen flex items-center justify-center">
    <FormularioAltaServicio />
    </div>
  );
}

export default App;