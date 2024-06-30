import React from 'react';
import { Modal, Button } from 'keep-react';
import { useCedulaSesion, useRolSesion } from '../../store/selectors';

export const ModalVisualizacionServicio = ({ /*servicio,*/ onClose }) => {
    const cedulaSesion = useCedulaSesion();
    const rolSesion = useRolSesion();

    if (!cedulaSesion || (rolSesion == 'cliente' && cedulaSesion !== servicio.cedulaUsuario)) {
        return null;
    }
    
    const servicio = {
        id: '1',
        cedulaUsuario: '12345678',
        fecha: '2024-06-30T04:00:09.304Z',
        nombre: 'Servicio de reparacion',
        numeroSerie: '123456789',
        marca: 'Apple',
        modelo: 'iPhone 12',
        color: 'Blanco',
        descripcion: 'Reparacion de pantalla',
        estado: 'En proceso',
        costo: '100.00'
    };

    const { id, fecha, cedulaUsuario, nombre, numeroSerie, marca, modelo, color, descripcion, estado, costo } = servicio;
    //const cedulaUsuario = useCedulaSesion();
    /*
    si cedulaUsuario !== servicio.cedulaUsuario, return null;
    */

    //const {nombre, descripcion, precio, categoria, imagenes} = servicio;
    //usuario, numero de serie, nombre, marca, modelo, color, descripcion, estado, costo presupuestado.

    return (
        <div>
            <Modal onClose={onClose} isOpen={true}>
                <Modal.Body>
                    <Modal.Content>
                        <div>
                            <h3>Servicio No: {id}</h3>
                            <p>Fecha: {fecha}</p>
                            <p>Usuario: {cedulaUsuario}</p>
                            <p>Nombre: {nombre}</p>
                            <p>Numero de serie: {numeroSerie}</p>
                            <p>Marca: {marca}</p>
                            <p>Modelo: {modelo}</p>
                            <p>Color: {color}</p>
                            <p>Descripcion: {descripcion}</p>
                            <p>Estado: {estado}</p>
                            <p>Costo: {costo}</p>
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

export default VisualizacionServicio;