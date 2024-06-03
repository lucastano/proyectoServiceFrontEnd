import React from 'react';
import { Modal, Button } from 'keep-react';

export const ModalConfirmacionAltaServicio = ({ onClose }) => {
    return (
       <div>
        <Modal onClose={onClose}>
            <Modal.Body className="space-y-3">
                <Modal.Content>
                    <div className="!mb-6">
                        <h3 className="mb-2 text-body-1 font-medium text-metal-900">Confirmación de alta de servicio</h3>
                        <p className="text-body-4 font-normal text-metal-600">
                        El servicio ha sido dado de alta exitosamente.
                        </p>
                    </div>
                    </Modal.Content>
                    <Modal.Footer>
                        <Button onClick={onClose} size="sm" color="primary">
                            Cerrar
                        </Button>
                    </Modal.Footer>
            </Modal.Body>
        </Modal>
       </div>
    );
};