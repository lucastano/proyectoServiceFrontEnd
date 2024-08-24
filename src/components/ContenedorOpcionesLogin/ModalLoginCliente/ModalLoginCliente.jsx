import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Modal,
  Button,
  Label,
  Input,
  toast,
  ModalAction,
  ModalBody,
  ModalClose,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalTitle
} from "keep-react";
import { login } from "../../../store/effects";
import { useNavigate } from "react-router-dom";

export const ModalLoginCliente = () => {
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

  const realizarLoginCliente = async () => {
    const usuarioParaLogin = {
      email: email,
      password: contrasena,
      rol: "Cliente",
    };

    try {
      await login(usuarioParaLogin, dispatch);
      navigate("/servicios");
      toast("Login exitoso");
    } catch (error) {
      toast.error("Error al iniciar sesión");
    }
  };

  return (
    <Modal>
      <ModalAction asChild>
        <Button id="modalButton">Como cliente</Button>
      </ModalAction>
      <ModalBody className="space-y-3">
        <ModalContent>
          <ModalClose className="absolute right-4 top-4" />
          <ModalHeader>
            <div className="!mb-6">
              <ModalTitle>
                Ingreso de cliente
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
              <Button variant="outline" color="secondary" size="sm">
                Cerrar
              </Button>
            </ModalClose>
            <Button onClick={realizarLoginCliente} size="sm">
              Ingresar
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};
