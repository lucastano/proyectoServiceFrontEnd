import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ModalLoginTecnico } from './ModalLoginTecnico';

describe('ModalLoginTecnico', () => {
    it('should render the modal with the correct inputs and buttons', () => {
        const onClose = jest.fn();
        const { getByPlaceholderText, getByText } = render(<ModalLoginTecnico onClose={onClose} />);

        expect(getByPlaceholderText('Usuario')).toBeInTheDocument();
        expect(getByPlaceholderText('Contraseña')).toBeInTheDocument();
        expect(getByText('Cerrar')).toBeInTheDocument();
        expect(getByText('Ingresar')).toBeInTheDocument();
    });

    it('should update the usuario state when the usuario input value changes', () => {
        const onClose = jest.fn();
        const { getByPlaceholderText } = render(<ModalLoginTecnico onClose={onClose} />);
        const usuarioInput = getByPlaceholderText('Usuario');

        fireEvent.change(usuarioInput, { target: { value: 'testuser' } });

        expect(usuarioInput.value).toBe('testuser');
    });

    it('should update the contrasena state when the contrasena input value changes', () => {
        const onClose = jest.fn();
        const { getByPlaceholderText } = render(<ModalLoginTecnico onClose={onClose} />);
        const contrasenaInput = getByPlaceholderText('Contraseña');

        fireEvent.change(contrasenaInput, { target: { value: 'testpassword' } });

        expect(contrasenaInput.value).toBe('testpassword');
    });

    it('should call onClose when the "Cerrar" button is clicked', () => {
        const onClose = jest.fn();
        const { getByText } = render(<ModalLoginTecnico onClose={onClose} />);
        const closeButton = getByText('Cerrar');

        fireEvent.click(closeButton);

        expect(onClose).toHaveBeenCalled();
    });

    //TODO: Cambiar test cuando se haga integracion con API
    it('should call realizarLoginTecnico when the "Ingresar" button is clicked', () => {
        const onClose = jest.fn();
        console.log = jest.fn();
        const { getByText } = render(<ModalLoginTecnico onClose={onClose} />);
        const ingresarButton = getByText('Ingresar');

        fireEvent.click(ingresarButton);

        expect(console.log).toHaveBeenCalled();
    });
});