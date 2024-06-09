import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ModalLoginAdmin } from './ModalLoginAdmin';

describe('ModalLoginAdmin', () => {
    it('should render the modal with the correct title', () => {
        const onClose = jest.fn();
        const { getByText } = render(<ModalLoginAdmin onClose={onClose} />);
        const titleElement = getByText('Ingreso de administrador');
        expect(titleElement).toBeInTheDocument();
    });

    it('should call onClose when the "Cerrar" button is clicked', () => {
        const onClose = jest.fn();
        const { getByText } = render(<ModalLoginAdmin onClose={onClose} />);
        const closeButton = getByText('Cerrar');
        fireEvent.click(closeButton);
        expect(onClose).toHaveBeenCalled();
    });

    it('should update the "usuario" state when the username input value changes', () => {
        const onClose = jest.fn();
        const { getByPlaceholderText } = render(<ModalLoginAdmin onClose={onClose} />);
        const usernameInput = getByPlaceholderText('Usuario');
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        expect(usernameInput.value).toBe('testuser');
    });

    it('should update the "contrasena" state when the password input value changes', () => {
        const onClose = jest.fn();
        const { getByPlaceholderText } = render(<ModalLoginAdmin onClose={onClose} />);
        const passwordInput = getByPlaceholderText('Contraseña');
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
        expect(passwordInput.value).toBe('testpassword');
    });

    //TODO: Cambiar test cuando se haga integracion con API
    it('should call realizarLoginAdmin when the "Ingresar" button is clicked', () => {
        const onClose = jest.fn();
        console.log = jest.fn();
        const { getByText } = render(<ModalLoginAdmin onClose={onClose} />);
        const ingresarButton = getByText('Ingresar');
        fireEvent.click(ingresarButton);
        expect(console.log).toHaveBeenCalled();
    });
});