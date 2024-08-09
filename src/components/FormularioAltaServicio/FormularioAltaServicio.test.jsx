import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { useRolSesion, useEmailSesion, useError } from "../../store/selectors";
import FormularioAltaServicio from "./FormularioAltaServicio";
import { altaServicioExito } from "../../store/actions";

jest.mock("../../store/selectors"); // Mock the useRolSesion and useEmailSesion hooks

//FUNCIONA BIEN
const mockStore = configureStore();
let store = mockStore({
  servicios: [],
  clientes: [],
  repuestos: [],
  tecnicos: [],
  admins: [],
  sesion: null,
  error: null,
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ token: 'mockToken', usuario: {} }),
  })
);

describe("FormularioAltaServicio", () => {
  beforeEach(() => {
    useError.mockReturnValue(null);
    useRolSesion.mockReturnValue("Tecnico"); // Mock the useRolSesion hook
    useEmailSesion.mockReturnValue("example@example.com"); // Mock the useEmailSesion hook
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  
  it("renders the form correctly", () => {
    render(
      <Provider store={store}>
        <FormularioAltaServicio />
      </Provider>
    );

    // Assert that all input fields are rendered
    expect(
      screen.getByLabelText("Cedula de identidad (sin guión):")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre - Usuario:")).toBeInTheDocument();
    expect(screen.getByLabelText("Apellido:")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Teléfono:")).toBeInTheDocument();
    expect(screen.getByLabelText("Dirección:")).toBeInTheDocument();
    expect(screen.getByLabelText("Numero de serie:")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre:")).toBeInTheDocument();
    expect(screen.getByLabelText("Marca:")).toBeInTheDocument();
    expect(screen.getByLabelText("Modelo:")).toBeInTheDocument();
    expect(screen.getByLabelText("Color:")).toBeInTheDocument();
    expect(screen.getByLabelText("Descripción:")).toBeInTheDocument();
  });

  it("updates state when input values change", () => {
    render(
      <Provider store={store}>
        <FormularioAltaServicio />
      </Provider>
    );

    // Simulate user input
    fireEvent.change(
      screen.getByLabelText("Cedula de identidad (sin guión):"),
      { target: { value: "12345678" } }
    );
    fireEvent.change(screen.getByLabelText("Nombre - Usuario:"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Apellido:"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Teléfono:"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText("Dirección:"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByLabelText("Numero de serie:"), {
      target: { value: "987654321" },
    });
    fireEvent.change(screen.getByLabelText("Nombre:"), {
      target: { value: "Product" },
    });
    fireEvent.change(screen.getByLabelText("Marca:"), {
      target: { value: "Brand" },
    });
    fireEvent.change(screen.getByLabelText("Modelo:"), {
      target: { value: "Model" },
    });
    fireEvent.change(screen.getByLabelText("Color:"), {
      target: { value: "Red" },
    });
    fireEvent.change(screen.getByLabelText("Descripción:"), {
      target: { value: "Lorem ipsum dolor sit amet" },
    });

    // Assert that state is updated correctly
    expect(
      screen.getByLabelText("Cedula de identidad (sin guión):")
    ).toHaveValue("12345678");
    expect(screen.getByLabelText("Nombre - Usuario:")).toHaveValue("John");
    expect(screen.getByLabelText("Apellido:")).toHaveValue("Doe");
    expect(screen.getByLabelText("Email:")).toHaveValue("john.doe@example.com");
    expect(screen.getByLabelText("Teléfono:")).toHaveValue("1234567890");
    expect(screen.getByLabelText("Dirección:")).toHaveValue("123 Main St");
    expect(screen.getByLabelText("Numero de serie:")).toHaveValue("987654321");
    expect(screen.getByLabelText("Nombre:")).toHaveValue("Product");
    expect(screen.getByLabelText("Marca:")).toHaveValue("Brand");
    expect(screen.getByLabelText("Modelo:")).toHaveValue("Model");
    expect(screen.getByLabelText("Color:")).toHaveValue("Red");
    expect(screen.getByLabelText("Descripción:")).toHaveValue(
      "Lorem ipsum dolor sit amet"
    );
  });

  it.only("submits correctly when form is submitted with valid data", async () => {
    const mockLocalStorage = {
      getItem: jest.fn(() => 'mockToken'),
      setItem: jest.fn(),
      clear: jest.fn()
    };
    global.localStorage = mockLocalStorage;
    const mockDispatch = jest.fn(); 
    store = { ...store, dispatch: mockDispatch }; 
    render(
      <Provider store={store}>
        <FormularioAltaServicio />
      </Provider>
    );

    // Simulate user input
    fireEvent.change(
      screen.getByLabelText("Cedula de identidad (sin guión):"),
      { target: { value: "12345678" } }
    );
    fireEvent.change(screen.getByLabelText("Nombre - Usuario:"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Apellido:"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Teléfono:"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText("Dirección:"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByLabelText("Numero de serie:"), {
      target: { value: "987654321" },
    });
    fireEvent.change(screen.getByLabelText("Nombre:"), {
      target: { value: "Product" },
    });
    fireEvent.change(screen.getByLabelText("Marca:"), {
      target: { value: "Brand" },
    });
    fireEvent.change(screen.getByLabelText("Modelo:"), {
      target: { value: "Model" },
    });
    fireEvent.change(screen.getByLabelText("Color:"), {
      target: { value: "Red" },
    });
    fireEvent.change(screen.getByLabelText("Descripción:"), {
      target: { value: "Lorem ipsum dolor sit amet" },
    });

    // Submit the form
    fireEvent.submit(screen.getByText("Registrar Servicio"));

    await waitFor(() => {});
    expect(mockDispatch).toHaveBeenCalledWith(altaServicioExito());
  });

  it("does not display confirmation modal when form is submitted with invalid data", () => {
    render(<FormularioAltaServicio />);

    // Simulate user input with invalid data
    fireEvent.change(
      screen.getByLabelText("Cedula de identidad (sin guión):"),
      { target: { value: "123" } }
    );
    fireEvent.change(screen.getByLabelText("Nombre - Usuario:"), {
      target: { value: "John123" },
    });
    fireEvent.change(screen.getByLabelText("Apellido:"), {
      target: { value: "Doe123" },
    });
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "john.doe@example" },
    });
    fireEvent.change(screen.getByLabelText("Teléfono:"), {
      target: { value: "123abc" },
    });
    fireEvent.change(screen.getByLabelText("Dirección:"), {
      target: { value: "123 Main St!" },
    });
    fireEvent.change(screen.getByLabelText("Numero de serie:"), {
      target: { value: "abc123" },
    });
    fireEvent.change(screen.getByLabelText("Nombre:"), {
      target: { value: "Product123" },
    });
    fireEvent.change(screen.getByLabelText("Marca:"), {
      target: { value: "Brand123" },
    });
    fireEvent.change(screen.getByLabelText("Modelo:"), {
      target: { value: "Model123" },
    });
    fireEvent.change(screen.getByLabelText("Color:"), {
      target: { value: "Red123" },
    });
    fireEvent.change(screen.getByLabelText("Descripción:"), {
      target: { value: "Lorem ipsum dolor sit amet!" },
    });

    // Submit the form
    fireEvent.submit(screen.getByText("Registrar Servicio"));

    // Assert that confirmation modal is not displayed
    expect(screen.queryByText("Confirmación de alta de servicio")).toBeNull();
  });
});
