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
  SidebarItem,
  ModalTitle
} from "keep-react";
import { logout } from "../../store/effects";

export const ModalLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const manejarLogout = async () => {
    try {
      await logout(dispatch);
      navigate("/");
      toast.success("Logout realizado con éxito");
    } catch (error) {
      toast.error("Error al realizar logout");
    }
  };

  return (
    <div>
      <Modal>
        <ModalAction asChild>
        <SidebarItem>
            <SignOut size={20}/>
            Salir
          </SidebarItem>
        </ModalAction>
        <ModalBody className="flex flex-col items-center">
          <ModalContent>
            <ModalClose className="absolute right-4 top-4"/>
            <ModalHeader>
              <div className="!mb-6">
                <ModalTitle>
                  Cierre de Sesión
                </ModalTitle>
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
                <Button onClick={manejarLogout} size="sm" color="primary">
                  Cerrar
                </Button>
            </ModalFooter>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
};
