import React, { useState } from "react";
import {
  Input,
  Label,
  Button,
  Textarea,
  Divider,
  toast,
  Popover,
  PopoverContent,
  PopoverTrigger,
  DatePicker,
} from "keep-react";
import {
  useIdSesion,
  useClientePorCi,
  useProductos,
} from "../../store/selectors";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postCliente, postReparacion } from "../../store/effects";
import { format } from "date-fns";
import { Calendar } from "phosphor-react";
import ModalAgregarProducto from "../ModalAgregarProducto/ModalAgregarProducto";

const FormularioAltaServicio = () => {
  const dispatch = useDispatch();
  const idSesion = useIdSesion();
  const productos = useProductos();
  const navigate = useNavigate();

  const [cedulaUsuario, setCedulaUsuario] = useState("");
  const clientePorCi = useClientePorCi(cedulaUsuario);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidoUsuario, setApellidoUsuario] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [telefonoUsuario, setTelefonoUsuario] = useState("");
  const [direccionUsuario, setDireccionUsuario] = useState("");
  const [numeroSerie, setNumeroSerie] = useState("");
  const [producto, setProducto] = useState(productos.length > 0 ? productos[0].id : null);
  const [descripcion, setDescripcion] = useState("");
  const [fechaPromesaPresupuesto, setFechaPromesaPresupuesto] = useState(null);
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(false);
  const [seBuscoUsuario, setSeBuscoUsuario] = useState(false);

  const generarOrdenReparacion = (blob) => {
    if (blob == null) return;

    if (!blob) {
      toast.error("Error al generar orden");
      return;
    }

    if (!(blob instanceof Blob)) {
      console.error(
        "Unexpected data format. Ensure Blob or valid data for PDF generation."
      );
      return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `orden_${numeroSerie}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const manejarCambioCedulaUsuario = (event) => {
    setCedulaUsuario(event.target.value);
  };

  const manejarCambioNombreUsuario = (event) => {
    setNombreUsuario(event.target.value);
  };

  const manejarCambioApellidoUsuario = (event) => {
    setApellidoUsuario(event.target.value);
  };

  const manejarCambioEmailUsuario = (event) => {
    setEmailUsuario(event.target.value);
  };

  const manejarCambioTelefonoUsuario = (event) => {
    setTelefonoUsuario(event.target.value);
  };

  const manejarCambioDireccionUsuario = (event) => {
    setDireccionUsuario(event.target.value);
  };

  const manejarCambioNumeroSerie = (event) => {
    setNumeroSerie(event.target.value);
  };

  const manejarCambioDescripcion = (event) => {
    setDescripcion(event.target.value);
  };
  let productoSeleccionado;

  const manejarCambioSelect = (event) => {
    const idProductoSeleccionado = event.target.value;
    setProducto(idProductoSeleccionado);
  };

  const validarCedulaUsuario = (valor) => {
    const regex = /^\d{8,12}$/;
    return regex.test(valor);
  };

  const validarNombreApellido = (valor) => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(valor);
  };

  const validarEmailUsuario = (valor) => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(valor);
  };

  const validarTelefonoUsuario = (valor) => {
    const regex = /^[0-9]+$/;
    return regex.test(valor);
  };

  const validarDireccionUsuario = (valor) => {
    const regex = /^[a-zA-Z0-9\s]+$/;
    return regex.test(valor);
  };

  const validarNumeroSerie = (valor) => {
    const regex = /^[A-Za-z0-9]+$/;
    return valor !== "" && regex.test(valor);
  };

  const validarDescripcion = (valor) => {
    return valor !== "";
  };

  const buscarUsuario = () => {
    if (clientePorCi == undefined) {
      setUsuarioEncontrado(false);
    } else {
      const { nombre, apellido, email, telefono, direccion } = clientePorCi;
      setUsuarioEncontrado(true);
      setNombreUsuario(nombre);
      setApellidoUsuario(apellido);
      setEmailUsuario(email);
      setTelefonoUsuario(telefono);
      setDireccionUsuario(direccion);
    }
  };

  const manejarPerdidaFocoCedulaUsuario = () => {
    buscarUsuario();
    setSeBuscoUsuario(true);
  };

  const validarFormulario = () => {
    return (
      validarNumeroSerie(numeroSerie) &&
      validarDescripcion(descripcion) &&
      producto != null
    );
  };

  const validarNuevoUsuario = () => {
    return (
      validarNombreApellido(nombreUsuario) &&
      validarNombreApellido(apellidoUsuario) &&
      validarEmailUsuario(emailUsuario) &&
      validarTelefonoUsuario(telefonoUsuario) &&
      validarDireccionUsuario(direccionUsuario) &&
      validarCedulaUsuario(cedulaUsuario)
    );
  };

  const altaClienteServicio = async () => {
    const nuevoUsuario = {
      ci: cedulaUsuario,
      nombre: nombreUsuario,
      apellido: apellidoUsuario,
      email: emailUsuario,
      telefono: telefonoUsuario,
      direccion: direccionUsuario,
    };

    try {
      await postCliente(nuevoUsuario, dispatch);
      toast("Cliente dado de alta correctamente");
    } catch (error) {
      toast.error("Error al dar de alta el cliente");
    }
  };

  const enviarFormulario = async (evento) => {
    evento.preventDefault();

    if (validarFormulario()) {
      if (
        clientePorCi == undefined &&
        seBuscoUsuario &&
        !usuarioEncontrado &&
        validarNuevoUsuario()
      ) {
        await altaClienteServicio();
      }

      const nuevaReparacion = {
        ciCliente: cedulaUsuario,
        idTecnico: idSesion,
        idProducto: Number(producto),
        numeroSerie: numeroSerie,
        descripcion: descripcion,
        fechaPromesaPresupuesto: fechaPromesaPresupuesto,
      };

      try {
        const blob = await postReparacion(nuevaReparacion);
        generarOrdenReparacion(blob);
        navigate("/serviciostecnico");
        toast("Reparacion dada de alta correctamente");
      } catch (error) {
        toast.error("Error al dar de alta la reparacion");
      }
    } else {
      toast.error("Error: Datos invalidos");
    }
  };

  return (
    <>
      <div className="rounded-lg border p-8 shadow-md text-left w-full">
        <h1 className="mb-4">Alta de servicio: </h1>
        <div className="mb-4 space-y-2">
          <Label htmlFor="cedulaUsuario">
            Cedula de identidad (sin guión):
          </Label>
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
          <Label htmlFor="emailUsuario">Email: </Label>
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
          <Label htmlFor="telefonoUsuario">Teléfono: </Label>
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
          <Label htmlFor="direccionUsuario">Dirección: </Label>
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
          <Divider size="lg" />
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
          <Label htmlFor="producto">Producto: </Label>
          <select
            value={
              productoSeleccionado !== null ? productoSeleccionado?.id : ""
            }
            onChange={manejarCambioSelect}
          >
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id}>
                {producto.marca} - {producto.modelo} ({producto.version})
              </option>
            ))}
          </select>
          <div>
            <ModalAgregarProducto />
          </div>
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
        <div className="mb-4 space-y-2">
          <Label htmlFor="fechaPromesa">Fecha promesa de presupuesto:</Label>
          <Popover showArrow={false} placement="bottom-start">
            <PopoverTrigger asChild>
              <Button
                className="w-[286px] justify-start gap-2 rounded-xl border border-metal-50 px-4 text-left text-body-4 font-normal text-metal-600 hover:bg-white active:focus:scale-100 dark:border-metal-900 dark:bg-metal-900 dark:text-white dark:hover:bg-metal-800"
                variant="outline"
                color="secondary"
              >
                <Calendar
                  size={20}
                  className="text-metal-400 dark:text-white"
                />
                {fechaPromesaPresupuesto ? (
                  format(fechaPromesaPresupuesto ?? new Date(), "dd/MM/yyyy")
                ) : (
                  <span>Seleccionar fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="z-50 max-w-min">
              <DatePicker
                mode="single"
                selected={fechaPromesaPresupuesto}
                onSelect={setFechaPromesaPresupuesto}
                showOutsideDays={true}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button
          size="sm"
          color="secondary"
          type="submit"
          onClick={enviarFormulario}
        >
          Registrar Servicio
        </Button>
      </div>
    </>
  );
};

export default FormularioAltaServicio;
