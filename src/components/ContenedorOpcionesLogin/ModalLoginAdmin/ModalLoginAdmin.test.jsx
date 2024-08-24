import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { ModalLoginAdmin } from "./ModalLoginAdmin";
import { useDispatch } from "react-redux";
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

describe("ModalLoginAdmin", () => {
  it("should render the modal with the correct title", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ModalLoginAdmin />
      </MemoryRouter>
    );
    const comoAdminButton = getByText("Como administrador");
    fireEvent.click(comoAdminButton);
    const tituloModal = getByText("Ingreso de administrador");
    expect(tituloModal).toBeInTheDocument();
  });

  it('should update the "email" state when the username input value changes', () => {
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <ModalLoginAdmin />
      </MemoryRouter>
    );
    const comoAdminButton = getByText("Como administrador");
    fireEvent.click(comoAdminButton);
    const usernameInput = getByPlaceholderText("Email");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    expect(usernameInput.value).toBe("testuser");
  });

  it('should update the "contrasena" state when the password input value changes', () => {
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <ModalLoginAdmin />
      </MemoryRouter>
    );
    const comoAdminButton = getByText("Como administrador");
    fireEvent.click(comoAdminButton);
    const passwordInput = getByPlaceholderText("Contraseña");
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    expect(passwordInput.value).toBe("testpassword");
  });

  it('should call realizarLoginAdmin when the "Ingresar" button is clicked', async () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <ModalLoginAdmin />
      </MemoryRouter>
    );
    const comoAdminButton = getByText("Como administrador");
    fireEvent.click(comoAdminButton);

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
          rol: "Administrador",
        },
        expect.any(Function)
      );
    });
  });
});
