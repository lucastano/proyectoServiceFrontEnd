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
} from "keep-react";
import { login } from "../../../store/effects";
import { useRolSesion, useError } from "../../../store/selectors";
import { limpiarError } from "../../../store/actions";
import { useNavigate } from "react-router-dom";

export const ModalLoginTecnico = () => {
  const dispatch = useDispatch();
  //const rolSesion = useRolSesion();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  /*
  if (rolSesion) {
    return;
  }
  */


  const manejarCambioEmail = (evento) => {
    setEmail(evento.target.value);
  };

  const manejarCambioContrasena = (evento) => {
    setContrasena(evento.target.value);
  };

  const realizarLoginTecnico = async () => {
    const usuarioParaLogin = {
      email: email,
      password: contrasena,
      rol: "Tecnico",
    };

    await login(usuarioParaLogin, dispatch);

    const error = useError();

    if (error) {
      toast.error("Error al iniciar sesión");
      dispatch(limpiarError());
    } else {
      navigate("/serviciostecnico");
      toast("Login exitoso"); 
    }
    
    document.getElementById("modalButton").click();
  };

  return (
    <Modal>
      <ModalAction asChild>
        <Button id="modalButton">Como tecnico</Button>
      </ModalAction>
      <ModalBody className="space-y-3">
        <ModalContent>
          <ModalClose className="absolute right-4 top-4"/>
          <ModalHeader>
            <div className="!mb-6">
              <h3 className="mb-2 text-body-1 font-medium text-metal-900">
                Ingreso de tecnico
              </h3>
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
              <Button onClick={realizarLoginTecnico} size="sm">
                Ingresar
              </Button>
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};
