import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { ModalLoginCliente } from "./ModalLoginCliente";
import { login } from "../../../store/effects";

//FUNCIONA BIEN CONFIRMADO
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
  useSelector: () => null,
}));

jest.mock("../../../store/effects");

const mockDispatch = jest.fn();
const mockLogin = login;

describe.skip("ModalLoginCliente", () => {
  it("should render the modal with the correct title", () => {
    const { getByText } = render(<ModalLoginCliente />);
    const comoClienteButton = getByText("Como cliente");
    fireEvent.click(comoClienteButton);
    const tituloModal = getByText("Ingreso de cliente");
    expect(tituloModal).toBeInTheDocument();
  });

  it('should update the "email" state when the input value changes', () => {
    const { getByPlaceholderText, getByText } = render(<ModalLoginCliente />);
    const comoClienteButton = getByText("Como cliente");
    fireEvent.click(comoClienteButton);
    const usernameInput = getByPlaceholderText("Email");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    expect(usernameInput.value).toBe("testuser");
  });

  it('should update the "contrasena" state when the input value changes', () => {
    const { getByPlaceholderText, getByText } = render(<ModalLoginCliente />);
    const comoClienteButton = getByText("Como cliente");
    fireEvent.click(comoClienteButton);
    const contrasenaInput = getByPlaceholderText("Contraseña");
    fireEvent.change(contrasenaInput, { target: { value: "testpassword" } });
    expect(contrasenaInput.value).toBe("testpassword");
  });

  it('should call realizarLoginCliente with correct data when the "Ingresar" button is clicked', async () => {
    const { getByText, getByPlaceholderText } = render(<ModalLoginCliente />);
    const comoClienteButton = getByText("Como cliente");
    fireEvent.click(comoClienteButton);

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Contraseña");
    fireEvent.change(emailInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    const ingresarButton = getByText("Ingresar");
    fireEvent.click(ingresarButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        {
          email: "testuser",
          password: "testpassword",
          rol: "Cliente",
        },
        expect.any(Function)
      );
    });
  });
});
