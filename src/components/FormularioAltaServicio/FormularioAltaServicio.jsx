import React, { useState } from 'react';
import { Input, Label, Button, Textarea, Divider } from "keep-react";
import { ModalConfirmacionAltaServicio } from '../ModalConfirmacionAltaServicio/ModalConfirmacionAltaServicio';


export const FormularioAltaServicio = () => {
    const [cedulaUsuario, setCedulaUsuario] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [apellidoUsuario, setApellidoUsuario] = useState('');
    const [emailUsuario, setEmailUsuario] = useState('');
    const [telefonoUsuario, setTelefonoUsuario] = useState('');
    const [direccionUsuario, setDireccionUsuario] = useState('');
    const [numeroSerie, setNumeroSerie] = useState('');
    const [nombre, setNombre] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [color, setColor] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [confirmacionAbierta, setConfirmacionAbierta] = useState(false);
    const [usuarioEncontrado, setUsuarioEncontrado] = useState(false);
    const [seBuscoUsuario, setSeBuscoUsuario] = useState(false);

    const manejarCambioCedulaUsuario = (event) => {
        setCedulaUsuario(event.target.value);
    }

    const manejarCambioNombreUsuario = (event) => {
        setNombreUsuario(event.target.value);
    }

    const manejarCambioApellidoUsuario = (event) => {
        setApellidoUsuario(event.target.value);
    }

    const manejarCambioEmailUsuario = (event) => {
        setEmailUsuario(event.target.value);
    }

    const manejarCambioTelefonoUsuario = (event) => {
        setTelefonoUsuario(event.target.value);
    }

    const manejarCambioDireccionUsuario = (event) => {
        setDireccionUsuario(event.target.value);
    }

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

    const validarCedulaUsuario = (valor) => {
        const regex = /^\d{8,12}$/;
      return regex.test(valor);
    }

    const validarNombreApellido = (valor) => {
        const regex = /^[a-zA-Z]+$/;
        return regex.test(valor);
      };

    const validarEmailUsuario = (valor) => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return regex.test(valor);
    }

    const validarTelefonoUsuario = (valor) => {
        const regex = /^[0-9]+$/;
        return regex.test(valor);
    }

    const validarDireccionUsuario = (valor) => {
        const regex = /^[a-zA-Z0-9\s]+$/;
        return regex.test(valor);
    }

    const validarNombre = (valor) => {
        const regex = /^[a-zA-Z0-9\s]+$/;
        return regex.test(valor);
    };

    const validarNumeroSerie = (valor) => {
        const regex = /^[0-9]+$/;
        return valor !== '' && regex.test(valor);
    }

    const validarMarca = (valor) => {
        const regex = /^[a-zA-Z0-9\s]+$/;
        return regex.test(valor);
    }

    const validarModelo = (valor) => {
        const regex = /^[a-zA-Z0-9\s]+$/;
        return regex.test(valor);
    }

    const validarColor = (valor) => {
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(valor);
    }

    const validarDescripcion = (valor) => {
        const regex = /^[a-zA-Z0-9\s]+$/;
        return regex.test(valor);
    }

    //TODO: Implementar la busqueda de usuario en la base de datos cuando se haga integracion con BE
    const buscarUsuario = () => {
        if(cedulaUsuario === '12345678') return;
        const usuarioBuscado = {
            cedula: cedulaUsuario,
            nombre: 'Juan',
            apellido: 'Perez',
            email: 'test@ejemplo.com',
            telefono: '099123456',
            direccion: 'Av. Siempreviva 1234',
        };

        if (usuarioBuscado != undefined) {
            const { nombre, apellido, email, telefono, direccion } = usuarioBuscado;
            setUsuarioEncontrado(true);
            setNombreUsuario(nombre);
            setApellidoUsuario(apellido);
            setEmailUsuario(email);
            setTelefonoUsuario(telefono);
            setDireccionUsuario(direccion);
        } else {
            setUsuarioEncontrado(false);
        }  
    }

    const manejarPerdidaFocoCedulaUsuario = () => {
        buscarUsuario();
        setSeBuscoUsuario(true);
    }
    
    const enviarFormulario = (evento) => {
        evento.preventDefault();

        if (validarCedulaUsuario(cedulaUsuario) && 
            validarNombreApellido(nombreUsuario) && 
            validarNombreApellido(apellidoUsuario) && 
            validarEmailUsuario(emailUsuario) && 
            validarTelefonoUsuario(telefonoUsuario) && 
            validarDireccionUsuario(direccionUsuario) && 
            validarNumeroSerie(numeroSerie) && 
            validarNombre(nombre) && 
            validarMarca(marca) && 
            validarModelo(modelo) && 
            validarColor(color) && 
            validarDescripcion(descripcion)) {
            console.log(`Cedula: ${cedulaUsuario}, Nombre: ${nombreUsuario}, Apellido: ${apellidoUsuario}, Email: ${emailUsuario}, Telefono: ${telefonoUsuario}, Direccion: ${direccionUsuario}`);
            console.log(`Numero de serie: ${numeroSerie}, Nombre: ${nombre}, Marca: ${marca}, Modelo: ${modelo}, Color: ${color}`);
            console.log(`Descripcion: ${descripcion}`);
            setConfirmacionAbierta(true);
        } else {
            console.log('Error: Datos invalidos');
        }
    };

    return (
    <>
    <form className="rounded-lg border p-8 shadow-md text-left w-2/5" onSubmit={enviarFormulario}>
    <div className="mb-4 space-y-2">
            <Label htmlFor="cedulaUsuario">Cedula de identidad (sin guión): </Label>
                <Input
                    id="cedulaUsuario"
                    placeholder="Cedula"
                    className="ps-4"
                    onChange={(e) => manejarCambioCedulaUsuario(e)}
                    onBlur={manejarPerdidaFocoCedulaUsuario}
                />
            </div>
            <div className="mb-4 space-y-2">
            <Label htmlFor="nombreUsuario">Nombre - Usuario: </Label>
                <Input
                    id="nombreUsuario"
                    placeholder="Nombre de usuario"
                    className="ps-4"
                    disabled={usuarioEncontrado || !seBuscoUsuario}
                    value={nombreUsuario}
                    onChange={(e) => manejarCambioNombreUsuario(e)}
                />
            </div>
            <div className="mb-4 space-y-2">
            <Label htmlFor="apellidoUsuario">Apellido: </Label>
                <Input
                    id="apellidoUsuario"
                    placeholder="Apellido"
                    className="ps-4"
                    disabled={usuarioEncontrado || !seBuscoUsuario}
                    value={apellidoUsuario}
                    onChange={(e) => manejarCambioApellidoUsuario(e)}
                />
            </div>
            <div className="mb-4 space-y-2">
            <Label htmlFor="emailUsuario" >Email: </Label>
                <Input
                    id="emailUsuario"
                    placeholder="Email"
                    className="ps-4"
                    disabled={usuarioEncontrado || !seBuscoUsuario}
                    value={emailUsuario}
                    onChange={(e) => manejarCambioEmailUsuario(e)}
                />
            </div>
            <div className="mb-4 space-y-2">
            <Label htmlFor="telefonoUsuario" >Teléfono: </Label>
                <Input
                    id="telefonoUsuario"
                    placeholder="Teléfono"
                    className="ps-4"
                    disabled={usuarioEncontrado || !seBuscoUsuario}
                    value={telefonoUsuario}
                    onChange={(e) => manejarCambioTelefonoUsuario(e)}
                />
            </div>
            <div className="mb-4 space-y-2">
            <Label htmlFor="direccionUsuario" >Dirección: </Label>
                <Input
                    id="direccionUsuario"
                    placeholder="Direccion"
                    className="ps-4"
                    disabled={usuarioEncontrado || !seBuscoUsuario}
                    value={direccionUsuario}
                    onChange={(e) => manejarCambioDireccionUsuario(e)}
                />
            </div>
            <div className="my-6">
                <Divider size="lg"/>
            </div>
        <div className="mb-4 space-y-2">
            <Label htmlFor="numeroSerie">Numero de serie: </Label>
                <Input
                    id="numeroSerie"
                    placeholder="Numero de serie"
                    className="ps-4"
                    onChange={(e) => manejarCambioNumeroSerie(e)}
                />
            </div>
        <div className="mb-4 space-y-2">
            <Label htmlFor="name">Nombre: </Label>
                <Input
                    id="name"
                    placeholder="Nombre"
                    className="ps-4"
                    onChange={(e) => manejarCambioNombre(e)}
                />
            </div>
        <div className="mb-4 space-y-2">
            <Label htmlFor="marca">Marca: </Label>
                <Input
                    id="marca"
                    placeholder="Marca"
                    className="ps-4"
                    onChange={(e) => manejarCambioMarca(e)}
                />
            </div>
        <div className="mb-4 space-y-2">
            <Label htmlFor="modelo">Modelo: </Label>
                <Input
                    id="modelo"
                    placeholder="Modelo"
                    className="ps-4"
                    onChange={(e) => manejarCambioModelo(e)}
                />
            </div>
        <div className="mb-4 space-y-2">
            <Label htmlFor="color">Color: </Label>
                <Input
                    id="color"
                    placeholder="Color"
                    className="ps-4"
                    onChange={(e) => manejarCambioColor(e)}
                />
            </div>
        <div className="mb-4 space-y-2">
            <Label htmlFor="descripcion">Descripción: </Label>
                <Textarea
                    id="descripcion"
                    placeholder="Escriba una descripcion aqui..."
                    className="ps-4"
                    onChange={(e) => manejarCambioDescripcion(e)}
                />
            </div>
        <Button size="sm" color="secondary" type="submit">
             Registrar Servicio
        </Button>
    </form>
        {confirmacionAbierta && <ModalConfirmacionAltaServicio onClose={manejarCierreModalConfirmacion} />}
    </>);
}