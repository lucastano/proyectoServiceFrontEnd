import React, { useState } from 'react';
import { Modal, Button } from 'keep-react';


export const ModalLoginCliente = ({ onClose }) => {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const manejarCambioUsuario = (evento) => {
        setUsuario(evento.target.value);
    };

    const manejarCambioContrasena = (evento) => {
        setContrasena(evento.target.value);
    }

    const realizarLoginCliente = () => {
        //completar con llamada a la API
    }


    return (
    <div>
        <Modal onClose={onClose} isOpen={true}>
            <Modal.Body>
                <Modal.Content>
                    <h1>Ingreso de cliente</h1>
                        <form>
                            <label>
                                Usuario:
                                <input type="text" onChange={e => manejarCambioUsuario(e)}/>
                            </label>
                            <label>
                                Contraseña:
                                <input type="password" onChange={e => manejarCambioContrasena(e)}/>
                            </label>
                        </form>  
                </Modal.Content>
                    <Modal.Footer>
                        <Button onClick={onClose}>Cerrar</Button>
                        <Button onClick={realizarLoginCliente}>Ingresar</Button>
                    </Modal.Footer>
            </Modal.Body>
        </Modal>
    </div>
    )
}