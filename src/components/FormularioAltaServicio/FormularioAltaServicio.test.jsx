import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormularioAltaServicio } from './FormularioAltaServicio';


jest.mock('keep-react', () => ({
    Input: jest.fn((props) => <input {...props} />),
    Label: jest.fn((props) => <label {...props} />),
    Button: jest.fn((props) => <button {...props} />),
    Textarea: jest.fn((props) => <textarea {...props} />)
  }));

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

    test('validates name correctly', () => {
        console.log = jest.fn();
        render(<FormularioAltaServicio />);
        
        const nombreInput = screen.getByLabelText('Nombre:');
        const submitButton = screen.getByText('Registrar Servicio');

        fireEvent.change(nombreInput, { target: { value: 'Servicio 1' } });
        fireEvent.click(submitButton);

        expect(console.log).not.toHaveBeenCalledWith('Error: Datos invalidos');
    });

    test('displays error message when name is invalid', () => {
        console.log = jest.fn();
        render(<FormularioAltaServicio />);
        
        const nombreInput = screen.getByLabelText('Nombre:');
        const submitButton = screen.getByText('Registrar Servicio');

        fireEvent.change(nombreInput, { target: { value: '1237{-+' } });
        fireEvent.click(submitButton);

        expect(console.log).toHaveBeenCalledWith('Error: Datos invalidos');
    });

    test('logs form data when submitted with valid name', () => {
        console.log = jest.fn();

        render(<FormularioAltaServicio />);
        
        const numeroSerieInput = screen.getByLabelText('Numero de serie:');
        const nombreInput = screen.getByLabelText('Nombre:');
        const marcaInput = screen.getByLabelText('Marca:');
        const modeloInput = screen.getByLabelText('Modelo:');
        const colorInput = screen.getByLabelText('Color:');
        const descripcionInput = screen.getByLabelText('Descripcion:');
        const submitButton = screen.getByText('Registrar Servicio');

        fireEvent.change(numeroSerieInput, { target: { value: '123456' } });
        fireEvent.change(nombreInput, { target: { value: 'Servicio 1' } });
        fireEvent.change(marcaInput, { target: { value: 'Marca 1' } });
        fireEvent.change(modeloInput, { target: { value: 'Modelo 1' } });
        fireEvent.change(colorInput, { target: { value: 'Rojo' } });
        fireEvent.change(descripcionInput, { target: { value: 'Descripción del servicio 1' } });
        fireEvent.click(submitButton);

        expect(console.log).toHaveBeenCalledWith('Numero de serie: 123456, Nombre: Servicio 1, Marca: Marca 1, Modelo: Modelo 1, Color: Rojo');
        expect(console.log).toHaveBeenCalledWith('Descripcion: Descripción del servicio 1');
    });
});