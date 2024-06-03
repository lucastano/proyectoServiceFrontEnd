// App.jsx
import "./App.css";
import React from "react";
import { useEffect, useState } from "react";
import { ContenedorOpcionesLogin } from "./components/ContenedorOpcionesLogin/ContenedorOpcionesLogin";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setTodos(json));
  }, []);

  return (
    <>
    <div>
    <ContenedorOpcionesLogin />
    </div>
    </>
  );
}

export default App;