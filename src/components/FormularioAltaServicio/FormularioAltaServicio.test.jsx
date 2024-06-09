import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormularioAltaServicio } from './FormularioAltaServicio';


jest.mock('keep-react', () => ({
    Input: jest.fn((props) => <input {...props} />),
    Label: jest.fn((props) => <label {...props} />),
    Button: jest.fn((props) => <button {...props} />),
    Textarea: jest.fn((props) => <textarea {...props} />),
}));

jest.mock('../ModalConfirmacionAltaServicio/ModalConfirmacionAltaServicio', () => {
    return {
        ModalConfirmacionAltaServicio: jest.fn(() => <div>Mocked ModalConfirmacionAltaServicio</div>)
    };
});

describe('FormularioAltaServicio', () => {
    test('renders without crashing', () => {
        render(<FormularioAltaServicio />);
    });
    
    test('renders form fields correctly', () => {
        render(<FormularioAltaServicio />);
        
        expect(screen.getByLabelText('Numero de serie:')).toBeInTheDocument();
        expect(screen.getByLabelText('Nombre:')).toBeInTheDocument();
        expect(screen.getByLabelText('Marca:')).toBeInTheDocument();
        expect(screen.getByLabelText('Modelo:')).toBeInTheDocument();
        expect(screen.getByLabelText('Color:')).toBeInTheDocument();
        expect(screen.getByLabelText('Descripcion:')).toBeInTheDocument();
    });

    test('updates state when input values change', () => {
        render(<FormularioAltaServicio />);
        
        const numeroSerieInput = screen.getByLabelText('Numero de serie:');
        const nombreInput = screen.getByLabelText('Nombre:');
        const marcaInput = screen.getByLabelText('Marca:');
        const modeloInput = screen.getByLabelText('Modelo:');
        const colorInput = screen.getByLabelText('Color:');
        const descripcionInput = screen.getByLabelText('Descripcion:');

        fireEvent.change(numeroSerieInput, { target: { value: '123456' } });
        fireEvent.change(nombreInput, { target: { value: 'Servicio 1' } });
        fireEvent.change(marcaInput, { target: { value: 'Marca 1' } });
        fireEvent.change(modeloInput, { target: { value: 'Modelo 1' } });
        fireEvent.change(colorInput, { target: { value: 'Rojo' } });
        fireEvent.change(descripcionInput, { target: { value: 'Descripción del servicio 1' } });

        expect(numeroSerieInput.value).toBe('123456');
        expect(nombreInput.value).toBe('Servicio 1');
        expect(marcaInput.value).toBe('Marca 1');
        expect(modeloInput.value).toBe('Modelo 1');
        expect(colorInput.value).toBe('Rojo');
        expect(descripcionInput.value).toBe('Descripción del servicio 1');
    });

    test('opens confirmation modal when form is submitted with valid data', () => {
        render(<FormularioAltaServicio />);
        
        fireEvent.change(screen.getByLabelText('Numero de serie:'), { target: { value: '123456' } });
        fireEvent.change(screen.getByLabelText('Nombre:'), { target: { value: 'Test Service' } });
        fireEvent.change(screen.getByLabelText('Marca:'), { target: { value: 'Test Brand' } });
        fireEvent.change(screen.getByLabelText('Modelo:'), { target: { value: 'Test Model' } });
        fireEvent.change(screen.getByLabelText('Color:'), { target: { value: 'Test Color' } });
        fireEvent.change(screen.getByLabelText('Descripcion:'), { target: { value: 'Test Description' } });
        fireEvent.submit(screen.getByRole('button', { name: 'Registrar Servicio' }));
        
        expect(screen.getByText('Mocked ModalConfirmacionAltaServicio')).toBeInTheDocument();
    });

    test('does not open confirmation modal when form is submitted with invalid data', () => {
        render(<FormularioAltaServicio />);
        
        fireEvent.submit(screen.getByRole('button', { name: 'Registrar Servicio' }));
        
        expect(screen.queryByText('Mocked ModalConfirmacionAltaServicio')).not.toBeInTheDocument();
    });
});