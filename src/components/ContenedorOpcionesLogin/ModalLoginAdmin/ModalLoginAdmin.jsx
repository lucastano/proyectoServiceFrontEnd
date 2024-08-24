import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Label, Input, toast, ModalAction, ModalBody, ModalClose, ModalHeader, ModalFooter, ModalContent, ModalTitle } from "keep-react";
import { getClientes, login, getProductos } from "../../../store/effects";
import { useNavigate } from "react-router-dom";

export const ModalLoginAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  const manejarCambioEmail = (evento) => {
    setEmail(evento.target.value);
  };

  const manejarCambioContrasena = (evento) => {
    setContrasena(evento.target.value);
  };

  const realizarLoginAdmin = async () => {
    const usuarioParaLogin = {
      email: email,
      password: contrasena,
      rol: "Administrador",
    };
  
    try {
      await login(usuarioParaLogin, dispatch);
      await traerProductos();
      await traerClientes();
      navigate("/metricas");
      toast("Login exitoso");
    } catch (error) {
      toast.error("Error al iniciar sesión");
    }   
  };

  const traerProductos = async () => {
    try {
      await getProductos(dispatch);
    } catch (error) {
      toast.error("No se pudo obtener productos");
  }
};
  
  const traerClientes = async () => {
    try {
      await getClientes(dispatch);
    } catch (error) {
      toast.error("No se pudo obtener clientes");
    }
  };

  return (
    <Modal>
      <ModalAction asChild>
        <Button id="modalButton">Como administrador</Button>
      </ModalAction>
      <ModalBody className="space-y-3">
        <ModalContent>
          <ModalClose className="absolute right-4 top-4" />
          <ModalHeader>
            <div className="!mb-6">
              <ModalTitle>
                Ingreso de administrador
              </ModalTitle>
              <form className="mx-auto max-w-md space-y-2 p-4">
                <fieldset className="space-y-1">
                  <Label htmlFor="email">Email: </Label>
                  <Input
                    placeholder="Email"
                    onChange={(e) => manejarCambioEmail(e)}
                  />
                </fieldset>
                <fieldset className="space-y-1">
                  <Label htmlFor="contrasena">Contraseña: </Label>
                  <Input
                    placeholder="Contraseña"
                    type="password"
                    onChange={(e) => manejarCambioContrasena(e)}
                  />
                </fieldset>
              </form>
            </div>
          </ModalHeader>
          <ModalFooter>
            <ModalClose asChild>
              <Button
                variant="outline"
                color="secondary"
                size="sm"
              >
                Cerrar
              </Button>
            </ModalClose>
              <Button onClick={realizarLoginAdmin} size="sm">
                Ingresar
              </Button>
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};
