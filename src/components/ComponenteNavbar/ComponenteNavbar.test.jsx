import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import ComponenteNavbar from "./ComponenteNavbar";
import { useRolSesion, useEmailSesion } from "../../store/selectors";

jest.mock("../../store/selectors");

//FUNCIONA BIEN CHECKED
const mockStore = configureStore();
const store = mockStore({
  servicios: [],
  clientes: [],
  repuestos: [],
  tecnicos: [],
  admins: [],
  sesion: null,
  error: null,
});

describe.skip("ComponenteNavbar", () => {
  it("renders without errors", () => {
    render(
      <Provider store={store}>
        <ComponenteNavbar />
      </Provider>
    );
  });

  it("displays login button when not logged in", () => {
    useRolSesion.mockReturnValue(null); // Mock the useRolSesion hook
    useEmailSesion.mockReturnValue(null); // Mock the useEmailSesion hook

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <ComponenteNavbar />
        </Router>
      </Provider>
    );
    expect(getByText("Login")).toBeInTheDocument();
  });

  it("displays technician-specific items for technicians and admins", () => {
    useRolSesion.mockReturnValue("Tecnico"); // Mock the useRolSesion hook
    useEmailSesion.mockReturnValue("example@example.com"); // Mock the useEmailSesion hook

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <ComponenteNavbar />
        </Router>
      </Provider>
    );
    expect(getByText("Nueva reparación")).toBeInTheDocument();
    expect(getByText("Servicios - Tecnico")).toBeInTheDocument();
    expect(getByText("Metricas")).toBeInTheDocument();
  });

  it("displays client-specific items for clients", () => {
    useRolSesion.mockReturnValue("Cliente"); // Mock the useRolSesion hook
    useEmailSesion.mockReturnValue("example@example.com"); // Mock the useEmailSesion hook

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <ComponenteNavbar />
        </Router>
      </Provider>
    );
    expect(getByText("Servicios")).toBeInTheDocument();
  });

  it("displays admin-specific items for admins", () => {
    useRolSesion.mockReturnValue("Administrador"); // Mock the useRolSesion hook
    useEmailSesion.mockReturnValue("example@example.com"); // Mock the useEmailSesion hook

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <ComponenteNavbar />
        </Router>
      </Provider>
    );
    expect(getByText("Nuevo Tecnico")).toBeInTheDocument();
  });

  it("displays logout button when logged in", () => {
    useRolSesion.mockReturnValue("Cliente"); // Mock the useRolSesion hook
    useEmailSesion.mockReturnValue("example@example.com"); // Mock the useEmailSesion hook

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <ComponenteNavbar />
        </Router>
      </Provider>
    );
    expect(getByText("Salir")).toBeInTheDocument();
  });
});
