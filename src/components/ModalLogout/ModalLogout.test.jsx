import React from 'react';
import { useHistory } from 'react-router-dom';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import { ModalLogout } from './ModalLogout';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: jest.fn(),
}));

const mockRemoveItem = jest.fn();
Object.defineProperty(window, "localStorage", {
  value: {
    removeItem: (...args) => mockRemoveItem(...args),
  },
});

describe('ModalLogout', () => {
    test('renders modal with correct content', () => {
        render(<ModalLogout onClose={jest.fn()} />);
        
        expect(screen.getByText('Cierre de Sesión')).toBeInTheDocument();
        expect(screen.getByText('Esta seguro que desea cerrar la sesión?')).toBeInTheDocument();
        expect(screen.getByText('Cancelar')).toBeInTheDocument();
        expect(screen.getByText('Cerrar')).toBeInTheDocument();
    });

    test('calls onClose when Cancelar button is clicked', () => {
        const onClose = jest.fn();
        render(<ModalLogout onClose={onClose} />);
        
        fireEvent.click(screen.getByText('Cancelar'));
        
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('calls manejarLogout and redirects to "/" when Cerrar button is clicked', () => {
        const onClose = jest.fn();
        const pushSpy = jest.fn();
        useHistory.mockReturnValue({ push: pushSpy });

        render(<ModalLogout onClose={onClose} />);
        
        fireEvent.click(screen.getByText('Cerrar'));
        
        expect(mockRemoveItem).toHaveBeenCalledWith('token');
        expect(onClose).toHaveBeenCalledTimes(1);
        expect(pushSpy).toHaveBeenCalledWith('/');
    });
});