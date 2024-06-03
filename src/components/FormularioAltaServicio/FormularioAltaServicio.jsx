import React, { useState } from 'react';
import { Input, Label, Button, Textarea } from "keep-react";


export const FormularioAltaServicio = () => {
    const [numeroSerie, setNumeroSerie] = useState('');
    const [nombre, setNombre] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [color, setColor] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [confirmacionAbierta, setConfirmacionAbierta] = useState(false);

    const manejarCambioNumeroSerie = (event) => {
        setNumeroSerie(event.target.value);
    }

    const manejarCambioNombre = (event) => {
        setNombre(event.target.value);
    }

    const manejarCambioMarca = (event) => {
        setMarca(event.target.value);
    }

    const manejarCambioModelo = (event) => {
        setModelo(event.target.value);
    }

    const manejarCambioColor = (event) => {
        setColor(event.target.value);
    }

    const manejarCambioDescripcion = (event) => {
        setDescripcion(event.target.value);
    }

    const manejarCierreModalConfirmacion = () => {
        setConfirmacionAbierta(false);
      }

    const validarNombre = (valor) => {
        const regex = /^[a-zA-Z0-9\s]+$/;
        return regex.test(valor);
    };

    const enviarFormulario = (evento) => {
        evento.preventDefault();
    
        if (validarNombre(nombre)) {
          console.log(`Numero de serie: ${numeroSerie}, Nombre: ${nombre}, Marca: ${marca}, Modelo: ${modelo}, Color: ${color}`);
          console.log(`Descripcion: ${descripcion}`);
          setConfirmacionAbierta(true);
        } else {
          console.log('Error: Datos invalidos');
        }
    };

    return (
        <div>
    <form className="mx-auto max-w-md space-y-2 rounded-lg border p-8 shadow-md" onSubmit={enviarFormulario}>
        <fieldset className="space-y-1">
            <Label htmlFor="numeroSerie">Numero de serie: </Label>
            <div className="relative">
                <Input
                    id="numeroSerie"
                    placeholder="Numero de serie"
                    className="ps-11"
                    onChange={(e) => manejarCambioNumeroSerie(e)}
                />
            </div>
        </fieldset>
        <fieldset className="space-y-1">
            <Label htmlFor="name">Nombre: </Label>
            <div className="relative">
                <Input
                    id="name"
                    placeholder="Nombre"
                    className="ps-11"
                    onChange={(e) => manejarCambioNombre(e)}
                />
            </div>
        </fieldset>
        <fieldset className="space-y-1">
            <Label htmlFor="marca">Marca: </Label>
            <div className="relative">
                <Input
                    id="marca"
                    placeholder="Marca"
                    className="ps-11"
                    onChange={(e) => manejarCambioMarca(e)}
                />
            </div>
        </fieldset>
        <fieldset className="space-y-1">
            <Label htmlFor="modelo">Modelo: </Label>
            <div className="relative">
                <Input
                    id="modelo"
                    placeholder="Modelo"
                    className="ps-11"
                    onChange={(e) => manejarCambioModelo(e)}
                />
            </div>
        </fieldset>
        <fieldset className="space-y-1">
            <Label htmlFor="color">Color: </Label>
            <div className="relative">
                <Input
                    id="color"
                    placeholder="Color"
                    className="ps-11"
                    onChange={(e) => manejarCambioColor(e)}
                />
            </div>
        </fieldset>
        <fieldset className="space-y-1">
            <Label htmlFor="descripcion">Descripcion: </Label>
            <div className="relative">
                <Textarea
                    id="descripcion"
                    placeholder="Escriba una descripcion aqui..."
                    className="ps-11"
                    onChange={(e) => manejarCambioDescripcion(e)}
                />
            </div>
        </fieldset>
        <Button size="sm" color="secondary" type="submit">
             Registrar Servicio
        </Button>
    </form>
        {confirmacionAbierta && <ModalConfirmacionAltaServicio onClose={manejarCierreModalConfirmacion} />}
    </div>);
}