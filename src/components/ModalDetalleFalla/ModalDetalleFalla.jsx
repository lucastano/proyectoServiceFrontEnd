import React from "react";
import {
  Modal,
  ModalAction,
  ModalBody,
  ModalContent,
  ModalClose,
  ModalFooter,
  ModalHeader,
  Button,
  Label,
  ModalTitle,
} from "keep-react";

const ModalDetalleFalla = ({ item }) => {
  const { id, falla, solucion, producto } = item;

  return (
    <Modal>
      <ModalAction asChild>
        <Button color="secondary" size="sm">
          Ver detalle
        </Button>
      </ModalAction>
      <ModalBody>
        <ModalContent>
          <ModalClose className="absolute right-4 top-4" />
          <ModalHeader>
            <div className="!mb-6">
              <ModalTitle>Falla No {id}</ModalTitle>
              <div className="mx-auto max-w-md space-y-2 p-4">
                <div className="space-y-1">
                  <Label htmlFor="numeroSerie">Producto: </Label>
                  <p>
                    {producto.marca} - {producto.modelo} - {producto.version}{" "}
                  </p>
                </div>
                <div className="space-y-1 mt-4">
                  <Label htmlFor="falla">Falla: </Label>
                  <p>{falla}</p>
                </div>
                <div className="space-y-1 mt-4">
                  <Label htmlFor="solucion">Solución: </Label>
                  <p>{solucion}</p>
                </div>
              </div>
            </div>
          </ModalHeader>
          <ModalFooter className="justify-center">
            <ModalClose asChild>
              <Button size="sm" color="success">
                Listo
              </Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export default ModalDetalleFalla;
