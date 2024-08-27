import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../../store/selectors";
import { toast, Label, Textarea, Button, Spinner } from "keep-react"
import { postFalla } from "../../store/effects";

const FormularioAltaFalla = () => {
  const dispatch = useDispatch();
  const productos = useProductos();
  const navigate = useNavigate();
  const [productoId, setProductoId] = useState(null);
  const [descripcionFalla, setDescripcionFalla] = useState("");
  const [solucion, setSolucion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const manejarCambioDescripcion = (event) => {
    setDescripcionFalla(event.target.value);
  };

  const manejarCambioSolucion = (event) => {
    setSolucion(event.target.value);
  };

  const manejarCambioSelect = (event) => {
    const idProductoSeleccionado = event.target.value;
    setProductoId(idProductoSeleccionado);
  };

  const validarDescripcion = () => {
    return descripcionFalla.length > 0;
  };

  const validarSolucion = () => {
    return solucion.length > 0;
  };

  const enviarFormulario = async () => {
    if (validarDescripcion() && validarSolucion() && productoId !== null) {
      const nuevaFalla = {
        productoId: Number(productoId),
        falla: descripcionFalla,
        solucion: solucion,
      };

      try {
        setIsLoading(true);
        await postFalla(nuevaFalla, dispatch);
        navigate('/fallas');
        toast.success("Falla dada de alta correctamente");
      } catch (error) {
        toast.error("Error al dar de alta la falla");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Error: Datos invalidos");
    }
  };

  return (
    <div className="rounded-lg border p-8 shadow-md text-left w-full">
        <h3>Alta de Falla: </h3>
        <div className="mb-4 space-y-2">
          <Label htmlFor="producto">Producto: </Label>
          <select
            value={productoId !== null ? productoId : ""}
            onChange={manejarCambioSelect}
          >
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id}>
                {producto.marca} - {producto.modelo} ({producto.version})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 space-y-2">
          <Label htmlFor="descripcionFalla">
            Descripcion de falla:
          </Label>
          <Textarea
            id="descripcionFalla"
            placeholder="Escriba una descripcion aqui..."
            className="ps-4"
            onChange={(e) => manejarCambioDescripcion(e)}
          />
        </div>
        <div className="mb-4 space-y-2">
          <Label htmlFor="descripcionSolucion">
            Descripcion de solución:
          </Label>
          <Textarea
            id="descripcionSolucion"
            placeholder="Escriba una solución aqui..."
            className="ps-4"
            onChange={(e) => manejarCambioSolucion(e)}
          />
        </div>
        <Button size="sm" color="secondary" type="submit" onClick={enviarFormulario} disabled={isLoading}>
          {isLoading ? (<><Spinner color="info" size="xl" /></>) : "Registrar Falla"}
        </Button>
    </div>
  );
};

export default FormularioAltaFalla;
