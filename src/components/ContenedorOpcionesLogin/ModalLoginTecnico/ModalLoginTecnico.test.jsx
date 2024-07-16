import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ModalLoginTecnico } from './ModalLoginTecnico';
import { useDispatch } from "react-redux";


//FUNCIONA BIEN
const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
  useSelector: () => null,
}));

jest.mock("../../../store/effects", () => ({
  login: jest.fn(),
}));

describe.skip('ModalLoginTecnico', () => {
    it('should render the modal with the correct inputs and buttons', () => {
        const { getByText } = render(<ModalLoginTecnico />);
        const comoTecnicoButton = getByText("Como tecnico");
        fireEvent.click(comoTecnicoButton);
        const tituloModal = getByText("Ingreso de tecnico");
        expect(tituloModal).toBeInTheDocument();
    });

    it('should update the Email state when the usuario input value changes', () => {
        const { getByPlaceholderText, getByText } = render(<ModalLoginTecnico />);
        const comoTecnicoButton = getByText("Como tecnico");
        fireEvent.click(comoTecnicoButton);

        const usernameInput = getByPlaceholderText("Email");
        fireEvent.change(usernameInput, { target: { value: "testuser" } });

        expect(usernameInput.value).toBe("testuser");
    });

    it('should update the contrasena state when the contrasena input value changes', () => {
        const { getByPlaceholderText, getByText } = render(<ModalLoginTecnico />);
        const comoTecnicoButton = getByText("Como tecnico");
        fireEvent.click(comoTecnicoButton);

        const contrasenaInput = getByPlaceholderText('Contraseña');
        fireEvent.change(contrasenaInput, { target: { value: 'testpassword' } });

        expect(contrasenaInput.value).toBe('testpassword');
    });


    it('should call realizarLoginTecnico when the "Ingresar" button is clicked', async () => {
        const { getByText, getByPlaceholderText } = render(<ModalLoginTecnico />);
        const comoTecnicoButton = getByText("Como tecnico");
        fireEvent.click(comoTecnicoButton);
    
        const emailInput = getByPlaceholderText("Email");
        const passwordInput = getByPlaceholderText("Contraseña");
        fireEvent.change(emailInput, { target: { value: "testuser" } });
        fireEvent.change(passwordInput, { target: { value: "testpassword" } });
        const ingresarButton = getByText("Ingresar");
        fireEvent.click(ingresarButton);
    
        expect(mockDispatch).toHaveBeenCalled();
      });
});