import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FormularioAltaCliente } from './FormularioAltaCliente';

jest.mock('keep-react', () => ({
    Input: jest.fn((props) => <input {...props} />),
    Label: jest.fn((props) => <label {...props} />),
    Button: jest.fn((props) => <button {...props} />),
    Modal: jest.fn((props) => <dialog{...props} />),
}));

describe('FormularioAltaCliente', () => {
    test('renders without crashing', () => {
        render(<FormularioAltaCliente />);
    });

    test('calls the submit function when the button is clicked', () => {
        // Interceptar console.log
        console.log = jest.fn();

        const { getByPlaceholderText, getByText } = render(<FormularioAltaCliente />);

        // Simular el llenado del formulario
        fireEvent.change(getByPlaceholderText('Nombre'), { target: { value: 'John' } });
        fireEvent.change(getByPlaceholderText('Apellido'), { target: { value: 'Doe' } });
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(getByPlaceholderText('Cedula de identidad'), { target: { value: '12345678' } });

        // Encontrar el botón y hacer clic en él
        const submitButton = getByText('Registrar cliente');
        fireEvent.click(submitButton);

        // Verificar que console.log fue llamado
        expect(console.log).toHaveBeenCalledWith('Nombre: John, Apellido: Doe, Email: john.doe@example.com, Cédula: 12345678');
    });
});