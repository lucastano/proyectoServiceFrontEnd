import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postProducto } from "../../store/effects";
import {
  Modal,
  ModalAction,
  Button,
  ModalBody,
  ModalContent,
  ModalClose,
  ModalHeader,
  Input,
  Label,
  ModalFooter,
  toast,
  ModalTitle
} from "keep-react";
import { useProductos, useRolSesion } from "../../store/selectors";

function ModalAgregarProducto() {
  const dispatch = useDispatch();
  const productos = useProductos();
  const navigate = useNavigate();
  const rolSesion = useRolSesion();
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
  }

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
    
    const productoExiste = productos.find(producto => producto.marca === nuevoProducto.marca && producto.modelo === nuevoProducto.modelo && producto.version === nuevoProducto.version);

    if (productoExiste) {
      toast.error("El producto ya existe");
      return;
    };

    try {
      await postProducto(dispatch, nuevoProducto);
      rolSesion === "Tecnico" ? navigate("/productos") : navigate("/metricas");
      toast("Producto ingresado", {
        description: "El producto ha sido ingresado correctamente",
      });
    } catch (error) {
      toast.error("Ha habido un error al ingresar el producto");
    }
  };

  return (
    <Modal>
      <ModalAction asChild>
        <Button position="start" id="buttonModal">
          Agregar Producto
        </Button>
      </ModalAction>
      <ModalBody className="space-y-3">
        <ModalContent>
          <ModalClose className="absolute right-4 top-4" />
          <ModalHeader>
            <div className="!mb-6">
              <ModalTitle>
                Agregar Producto
              </ModalTitle>
              <form className="mx-auto max-w-md space-y-2 p-4">
                <fieldset className="space-y-1">
                  <Label htmlFor="marca">Marca:</Label>
                  <Input
                    placeholder="Marca"
                    onChange={(e) => manejarCambioMarca(e)}
                  />
                </fieldset>
                <fieldset className="space-y-1">
                  <Label htmlFor="modelo">Modelo:</Label>
                  <Input
                    placeholder="Modelo"
                    onChange={(e) => manejarCambioModelo(e)}
                  />
                </fieldset>
                <fieldset className="space-y-1">
                  <Label htmlFor="version">Versión:</Label>
                  <Input
                    placeholder="version"
                    onChange={(e) => manejarCambioVersion(e)}
                  />
                </fieldset>
              </form>
            </div>
          </ModalHeader>
          <ModalFooter className="justify-center">
            <Button onClick={manejarClickAgregarProducto} size="md">
              Agregar Producto
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}

export default ModalAgregarProducto;
