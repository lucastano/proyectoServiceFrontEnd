import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormularioAltaCliente } from './FormularioAltaCliente';


jest.mock('keep-react', () => ({
    Input: jest.fn((props) => <input {...props} />),
    Label: jest.fn((props) => <label {...props} />),
    Button: jest.fn((props) => <button {...props} />),
}));

jest.mock('../ModalConfirmacionAltaCliente/ModalConfirmacionAltaCliente', () => {
    return {
        ModalConfirmacionAltaCliente: jest.fn(() => <div>Mocked ModalConfirmacionAltaCliente</div>)
    };
});

describe('FormularioAltaCliente', () => {
    test('renders without crashing', () => {
        render(<FormularioAltaCliente />);
    });
    
    test('renders form fields correctly', () => {
        render(<FormularioAltaCliente />);
        
        expect(screen.getByLabelText('Nombre:')).toBeInTheDocument();
        expect(screen.getByLabelText('Apellido:')).toBeInTheDocument();
        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('Cedula de identidad (sin guión):')).toBeInTheDocument();
    });


    test('updates state when input values change', () => {
        render(<FormularioAltaCliente />);
        
        const nombreInput = screen.getByLabelText('Nombre:');
        const apellidoInput = screen.getByLabelText('Apellido:');
        const emailInput = screen.getByLabelText('Email:');
        const cedulaInput = screen.getByLabelText('Cedula de identidad (sin guión):');

        fireEvent.change(nombreInput, { target: { value: 'TestName' } });
        fireEvent.change(apellidoInput, { target: { value: 'TestLastname' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(cedulaInput, { target: { value: '12345678' } });

        expect(nombreInput.value).toBe('TestName');
        expect(apellidoInput.value).toBe('TestLastname');
        expect(emailInput.value).toBe('test@example.com');
        expect(cedulaInput.value).toBe('12345678');
    });

    test('opens confirmation modal when form is submitted with valid data', () => {
        render(<FormularioAltaCliente />);
        
        const nombreInput = screen.getByLabelText('Nombre:');
        const apellidoInput = screen.getByLabelText('Apellido:');
        const emailInput = screen.getByLabelText('Email:');
        const cedulaInput = screen.getByLabelText('Cedula de identidad (sin guión):');

        fireEvent.change(nombreInput, { target: { value: 'Nombreprueba' } });
        fireEvent.change(apellidoInput, { target: { value: 'Apellidoprueba' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(cedulaInput, { target: { value: '12345678' } });
        fireEvent.submit(screen.getByRole('button', { name: 'Registrar cliente' }));
        
        
        expect(screen.getByText('Mocked ModalConfirmacionAltaCliente')).toBeInTheDocument();
    });

    test('does not open confirmation modal when form is submitted with invalid data', () => {
        render(<FormularioAltaCliente />);
        
        fireEvent.submit(screen.getByRole('button', { name: 'Registrar cliente' }));
        
        expect(screen.queryByText('Mocked ModalConfirmacionAltaCliente')).not.toBeInTheDocument();
    });
});