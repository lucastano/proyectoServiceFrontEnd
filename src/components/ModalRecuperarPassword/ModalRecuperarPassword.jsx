import React, { useState } from "react";
import { Modal, ModalAction, ModalBody, ModalClose, ModalFooter, ModalHeader, ModalTitle, ModalDescription, Label, Input, Button, ModalContent } from "keep-react";

const ModalRecuperarPassword = () => {
  const [mail, setMail] = useState("");

  const manejarCambioEmail = (e) => {
    setMail(e.target.value);
  };

  const solicitarContrasena = () => {
    //logica para solicitar contrasena. falta endpoint aca.
  };


  return (
    <Modal>
      <ModalAction asChild>
        <Button id="modalButton">Olvidé mi contraseña</Button>
      </ModalAction>
      <ModalBody className="space-y-3">
        <ModalContent>
          <ModalClose className="absolute right-4 top-4" />
          <ModalHeader>
            <div className="!mb-6">
              <ModalTitle>Editar presupuesto</ModalTitle>
              <ModalDescription>
                Recuerde que si es cliente, su contraseña es su documento de
                identidad. De lo contrario, complete con su mail y le será
                enviada una nueva contraseña.
              </ModalDescription>
              <div className="mx-auto max-w-md space-y-2 p-4">
                <div className="space-y-1">
                  <Label htmlFor="email">Email: </Label>
                  <Input
                    placeholder={"Dirección de correo"}
                    onChange={(e) => manejarCambioEmail(e)}
                  />
                </div>
              </div>
            </div>
          </ModalHeader>
          <ModalFooter>
            <Button onClick={solicitarContrasena}>Solicitar contraseña</Button>
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export default ModalRecuperarPassword;
