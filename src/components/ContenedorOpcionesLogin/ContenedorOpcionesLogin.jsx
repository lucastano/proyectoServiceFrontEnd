import React, { useState } from 'react';
import { Button } from "keep-react";
import { ModalLoginCliente } from './ModalLoginCliente/ModalLoginCliente';
import { ModalLoginTecnico } from './ModalLoginTecnico/ModalLoginTecnico';
import { ModalLoginAdmin } from './ModalLoginAdmin/ModalLoginAdmin';

export const ContenedorOpcionesLogin = () => {
    const [mostrarLoginCliente, setMostrarLoginCliente] = useState(false);
    const [mostrarLoginTecnico, setMostrarLoginTecnico] = useState(false);
    const [mostrarLoginAdmin, setMostrarLoginAdmin] = useState(false);

    const manejarClickLoginCliente = () => {
        setMostrarLoginCliente(true);
        setMostrarLoginTecnico(false);
        setMostrarLoginAdmin(false);
    }

    const manejarClickLoginTecnico = () => {
        setMostrarLoginCliente(false);
        setMostrarLoginTecnico(true);
        setMostrarLoginAdmin(false);
    }

    const manejarClickLoginAdmin = () => {
        setMostrarLoginCliente(false);
        setMostrarLoginTecnico(false);
        setMostrarLoginAdmin(true);
    }

    const manejarCierreModal = () => {
        setMostrarLoginCliente(false);
        setMostrarLoginTecnico(false);
        setMostrarLoginAdmin(false);
    }

    return (
        <div>
            <h1>Login</h1>
            <h2>Seleccione una opción de acceso</h2>
            <Button onClick={manejarClickLoginCliente}>Como cliente</Button>
            <Button onClick={manejarClickLoginAdmin}>Como admin</Button>
            <Button onClick={manejarClickLoginTecnico}>Como tecnico</Button>
            {mostrarLoginCliente && <ModalLoginCliente onClose={manejarCierreModal}/>}
            {mostrarLoginTecnico && <ModalLoginTecnico onClose={manejarCierreModal}/>}
            {mostrarLoginAdmin && <ModalLoginAdmin onClose={manejarCierreModal}/>}
        </div>
    );
};
