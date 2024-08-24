import React, { useState } from "react";
import { toast, Modal, ModalAction, ModalBody, ModalClose, ModalFooter, ModalHeader, ModalTitle, ModalDescription, Label, Input, Button, ModalContent } from "keep-react";
import { useNavigate } from "react-router-dom";
import { recuperarPasswordAdmin, recuperarPasswordTecnico } from "../../store/effects";

const ModalRecuperarPassword = () => {
  const [mail, setMail] = useState("");
  const navigate = useNavigate();

  const manejarCambioEmail = (e) => {
    setMail(e.target.value);
  };
  const solicitarContrasena = async (rol) => {
    try {
      if (rol == "Tecnico") { 
        await recuperarPasswordTecnico(mail);
      } else if (rol == "Administrador") {
        await recuperarPasswordAdmin(mail);
      }
      navigate('/');
      toast('Solicitud enviada. Si no aparece email, revise casilla de spam');
    } catch (error) {
      toast.error("Error al solicitar contraseña");
    } 
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
              <div className="mt-4">
              <ModalDescription>
                Recuerde que si es cliente, su contraseña es su documento de
                identidad. De lo contrario, complete con su mail y le será
                enviada una nueva contraseña. En caso de no recibir el email, 
                revise su carpeta de spam o correo no deseado.
              </ModalDescription>
              </div>
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
            <Button onClick={() => solicitarContrasena("Administrador")}>Como administrador</Button>
            <Button onClick={() => solicitarContrasena("Tecnico")}>Como técnico</Button>
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export default ModalRecuperarPassword;
