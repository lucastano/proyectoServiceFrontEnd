import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ModalLoginCliente } from './ModalLoginCliente';

describe('ModalLoginCliente', () => {
    it('should render the modal with the correct title', () => {
        const onClose = jest.fn();
        const { getByText } = render(<ModalLoginCliente onClose={onClose} />);
        const titleElement = getByText('Ingreso de cliente');
        expect(titleElement).toBeInTheDocument();
    });

    it('should call onClose when the "Cerrar" button is clicked', () => {
        const onClose = jest.fn();
        const { getByText } = render(<ModalLoginCliente onClose={onClose} />);
        const closeButton = getByText('Cerrar');
        fireEvent.click(closeButton);
        expect(onClose).toHaveBeenCalled();
    });

    it('should update the "usuario" state when the input value changes', () => {
        const onClose = jest.fn();
        const { getByPlaceholderText } = render(<ModalLoginCliente onClose={onClose} />);
        const usuarioInput = getByPlaceholderText('Usuario');
        fireEvent.change(usuarioInput, { target: { value: 'testuser' } });
        expect(usuarioInput.value).toBe('testuser');
    });

    it('should update the "contrasena" state when the input value changes', () => {
        const onClose = jest.fn();
        const { getByPlaceholderText } = render(<ModalLoginCliente onClose={onClose} />);
        const contrasenaInput = getByPlaceholderText('Contraseña');
        fireEvent.change(contrasenaInput, { target: { value: 'testpassword' } });
        expect(contrasenaInput.value).toBe('testpassword');
    });

    //TODO: Cambiar test cuando se haga integracion con API
    it('should call realizarLoginCliente when the "Ingresar" button is clicked', () => {
        const onClose = jest.fn();
        console.log = jest.fn();
        const { getByText } = render(<ModalLoginCliente onClose={onClose} />);
        const ingresarButton = getByText('Ingresar');
        fireEvent.click(ingresarButton);
        expect(console.log).toHaveBeenCalled();
    });
});