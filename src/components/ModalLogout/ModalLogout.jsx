import React from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'keep-react';

export const ModalLogout = ({ onClose }) => {
    const manejarLogout = () => {
        localStorage.removeItem('token');
        onClose();
        const history = useHistory();
        history.push('/');
    }

    return (
        <div>
            <Modal onClose={onClose} isOpen={true}>
                <Modal.Body className="flex flex-col items-center">
                    <Modal.Content>
                        <div className="!mb-6">
                            <h3 className="mb-2 text-body-1 font-medium text-metal-900">Cierre de Sesión</h3>
                            <p className="text-body-4 font-normal text-metal-600">
                                Esta seguro que desea cerrar la sesión?
                            </p>
                        </div>
                    </Modal.Content>
                    <Modal.Footer>
                        <Button onClick={onClose} size="sm" color="secondary">
                            Cancelar
                        </Button>
                        <Button onClick={manejarLogout} size="sm" color="primary">
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </div>
    )
}