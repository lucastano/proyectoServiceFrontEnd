import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DropdownTecnicos from './DropdownTecnicos';
import * as selectors from "../../store/selectors";

jest.mock("../../store/selectors");

describe('DropdownTecnicos', () => {
    test('renders dropdown component and simulates button click', () => {
        const mockTecnicos = [
            { id: 1, nombre: 'John', apellido: 'Doe' },
            { id: 2, nombre: 'Jane', apellido: 'Doe' },
        ];

        selectors.useTecnicos.mockReturnValue(mockTecnicos);

        render(
            <Router>
                <DropdownTecnicos />
            </Router>
        );

        const button = screen.getByRole('button');
        fireEvent.click(button);

        mockTecnicos.forEach(tecnico => {
            expect(screen.getByText(`${tecnico.nombre} ${tecnico.apellido}`)).toBeInTheDocument();
        });

    });
});