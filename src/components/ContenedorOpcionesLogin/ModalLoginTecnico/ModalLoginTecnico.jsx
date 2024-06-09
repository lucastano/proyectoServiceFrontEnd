import React, { useState } from 'react';
import { Modal, Button, Label, Input } from 'keep-react';


export const ModalLoginTecnico = ({ onClose }) => {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const manejarCambioUsuario = (evento) => {
        setUsuario(evento.target.value);
    };

    const manejarCambioContrasena = (evento) => {
        setContrasena(evento.target.value);
    }

    const realizarLoginTecnico = () => {
        //completar con llamada a la API
        console.log('Usuario: ', usuario);
    }


    return (
        <div>
        <Modal onClose={onClose} isOpen={true}>
            <Modal.Body className="space-y-3">
                <Modal.Content>
                    <div className="!mb-6">
                    <h3 className="mb-2 text-body-1 font-medium text-metal-900">Ingreso de tecnico</h3>
                        <form className="mx-auto max-w-md space-y-2 p-4">
                        <fieldset className="space-y-1">
                            <Label htmlFor="usuario">Usuario: </Label>
                            <Input
                                placeholder="Usuario"
                                onChange={(e) => manejarCambioUsuario(e)}
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
                </Modal.Content>
                    <Modal.Footer>
                        <Button onClick={onClose} variant="outline" color="secondary" size="sm">Cerrar</Button>
                        <Button onClick={realizarLoginTecnico} size="sm">Ingresar</Button>
                    </Modal.Footer>
            </Modal.Body>
        </Modal>
    </div>
    )
}