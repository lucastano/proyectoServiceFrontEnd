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
  ModalTitle,
  Spinner,
} from "keep-react";
import { login, getClientes, getProductos } from "../../../store/effects";
import { useNavigate } from "react-router-dom";


export const ModalLoginTecnico = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const traerClientes = async () => {
    try {
      await getClientes(dispatch);
    } catch (error) {
      toast.error("No se pudo obtener clientes");
    }
  };

  const traerProductos = async () => {
    try {
      await getProductos(dispatch);
    } catch (error) {
      toast.error("No se pudo obtener productos");
  }
};


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
  
    try {
      setIsLoading(true);
      await login(usuarioParaLogin, dispatch);
      await traerClientes();
      await traerProductos();
      navigate("/serviciostecnico");
      toast.success("Login exitoso");
    } catch (error) {
      toast.error("Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }

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
              <ModalTitle>
                Ingreso de tecnico
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
            {isLoading ? (
              <>
                <Spinner color="info" size="xl" />
              </>
            ) : (
              <>
                <ModalClose asChild>
                  <Button variant="outline" color="secondary" size="sm">
                    Cerrar
                  </Button>
                </ModalClose>
                <Button onClick={realizarLoginTecnico} size="sm">
                  Ingresar
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};
