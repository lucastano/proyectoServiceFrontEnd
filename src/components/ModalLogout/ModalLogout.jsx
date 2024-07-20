import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SignOut } from "phosphor-react";
import {
  Modal,
  Button,
  toast,
  ModalAction,
  ModalBody,
  ModalContent,
  ModalClose,
  ModalHeader,
  ModalFooter,
} from "keep-react";
import { logout } from "../../store/effects";
import { limpiarError } from "../../store/actions";
import { useError } from "../../store/selectors";

export const ModalLogout = () => {
  const dispatch = useDispatch();

  const manejarLogout = () => {
    localStorage.removeItem("token");
    logout(dispatch);

    const error = useError();

    if (error) {
      toast.error("Error al realizar logout");
      dispatch(limpiarError());
    } else {
      const navigate = useNavigate();
      navigate("/");
      toast.success("Logout realizado con éxito");
    }

    document.getElementById("buttonModal").click();
  };

  return (
    <div>
      <Modal>
        <ModalAction asChild>
          <span id="buttonModal">
            <SignOut size={20}/>
            Salir
          </span>
        </ModalAction>
        <ModalBody className="flex flex-col items-center">
          <ModalContent>
            <ModalClose className="absolute right-4 top-4"/>
            <ModalHeader>
              <div className="!mb-6">
                <h3 className="mb-2 text-body-1 font-medium text-metal-900">
                  Cierre de Sesión
                </h3>
                <p className="text-body-4 font-normal text-metal-600">
                  Esta seguro que desea cerrar la sesión?
                </p>
              </div>
            </ModalHeader>
            <ModalFooter>
              <ModalClose asChild>
                <Button size="sm" color="secondary">
                  Cancelar
                </Button>
              </ModalClose>
              <ModalClose asChild>
                <Button onClick={manejarLogout} size="sm" color="primary">
                  Cerrar
                </Button>
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
};
