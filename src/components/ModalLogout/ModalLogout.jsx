import React from 'react';
import { Modal, Button } from 'keep-react';

export const ModalLogout = ({ onClose }) => {
    return (
        <div>
            <Modal onClose={onClose} isOpen={true}>
                <Modal.Body className="flex flex-col items-center">
                    <Modal.Content>
                        <div className="!mb-6">
                            <h3 className="mb-2 text-body-1 font-medium text-metal-900">Logout realizado</h3>
                            <p className="text-body-4 font-normal text-metal-600">
                                El usuario ha sido desconectado exitosamente
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
    )
}