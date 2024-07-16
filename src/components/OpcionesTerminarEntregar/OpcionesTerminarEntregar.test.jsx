import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import OpcionesTerminarEntregar from "./OpcionesTerminarEntregar";
import * as Selectors from "../../store/selectors";
import * as Effects from "../../store/effects";

jest.mock("react-redux");

describe.skip("OpcionesTerminarEntregar", () => {
  const servicioMock = {
    id: 1,
    fecha: "2024-07-06T20:16:34.513Z",
    clienteNombre: "NombreTest",
    clienteApellido: "ApellidoTest",
    clienteCedula: "12345678",
    clienteEmail: "test@test.com",
    clienteTelefono: "26962412",
    clienteDireccion: "Calle Falsa 1234",
    producto: "iPod",
    numeroSerie: "123456",
    descripcion: "iPod de prueba que no funciona",
    estado: "En proceso",
    descripcionPresupuesto:
      "Hubo que traer el sustituto de la pantalla de afuera",
    costo: 250,
  };

  let dispatchMock;
  let useServicioPorIdSpy;
  let postEntregarReparacionSpy = jest.fn();

  beforeEach(() => {
    dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
    useServicioPorIdSpy = jest.spyOn(Selectors, "useServicioPorId");

    postEntregarReparacionSpy = jest.spyOn(Effects, "postEntregarReparacion").mockImplementation(postEntregarReparacionSpy);
  });

  test("renders without error", () => {
    render(<OpcionesTerminarEntregar idServicio={1} />);
  });

  test("handles correctly clicking Terminar button", () => {
    // Mock store (not needed for this test)

    render(<OpcionesTerminarEntregar idServicio={1} />);

    const terminarButton = screen.getByText("Terminar");

    fireEvent.click(terminarButton);

    expect(screen.getByText("Terminar reparación")).toBeInTheDocument();
  });

  test("handles correctly clicking Entregar button", () => {
    useServicioPorIdSpy.mockReturnValueOnce(() => servicioMock);  // Fix for mocking selector

    const { getByText } = render(<OpcionesTerminarEntregar idServicio={1} />);

    const entregarButton = screen.getByText("Entregar");

    fireEvent.click(entregarButton);

    expect(dispatchMock).toHaveBeenCalledWith(postEntregarReparacion(servicioMock, dispatchMock));  // Verify dispatched action

    expect(
      getByText("El servicio ha sido entregado al cliente")
    ).toBeInTheDocument();
  });
});
