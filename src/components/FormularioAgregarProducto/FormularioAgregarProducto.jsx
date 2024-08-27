import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postProducto } from "../../store/effects";
import {
  Button,
  Input,
  Label,
  toast,
} from "keep-react";
import { useProductos } from "../../store/selectors";

function FormularioAgregarProducto() {
  const dispatch = useDispatch();
  const productos = useProductos();
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [version, setVersion] = useState("");

  const manejarCambioMarca = (e) => {
    setMarca(e.target.value);
  };

  const manejarCambioModelo = (e) => {
    setModelo(e.target.value);
  };

  const manejarCambioVersion = (e) => {
    setVersion(e.target.value);
  };

  const validarCampos = () => {
    return marca.length > 0 && modelo.length > 0 && version.length > 0;
  };

  const manejarClickAgregarProducto = async () => {
    if (!validarCampos) {
      toast.error("Por favor complete todos los campos");
      return;
    }

    const nuevoProducto = {
      marca: marca,
      modelo: modelo,
      version: version,
    };

    const productoExiste = productos.find(
      (producto) =>
        producto.marca === nuevoProducto.marca &&
        producto.modelo === nuevoProducto.modelo &&
        producto.version === nuevoProducto.version
    );

    if (productoExiste) {
      toast.error("El producto ya existe");
      return;
    }

    try {
      await postProducto(dispatch, nuevoProducto);
      toast.success("Producto ingresado", {
        description: "El producto ha sido ingresado correctamente",
      });
    } catch (error) {
      toast.error("Ha habido un error al ingresar el producto");
    }
  };

  return (
    <div className="rounded-lg p-8 shadow-md text-left w-full">
      <h1 className="mb-4">Agregar Producto: </h1>
      <div className="mb-4 space-y-2">
        <Label htmlFor="marca">Marca:</Label>
        <Input placeholder="Marca" onChange={(e) => manejarCambioMarca(e)} />
      </div>
      <div className="mb-4 space-y-2">
        <Label htmlFor="modelo">Modelo:</Label>
        <Input placeholder="Modelo" onChange={(e) => manejarCambioModelo(e)} />
      </div>
      <div className="mb-4 space-y-2">
        <Label htmlFor="version">Versión:</Label>
        <Input
          placeholder="version"
          onChange={(e) => manejarCambioVersion(e)}
        />
      </div>
      <Button onClick={manejarClickAgregarProducto} size="md">
        Agregar Producto
      </Button>
    </div>
  );
}

export default FormularioAgregarProducto;
