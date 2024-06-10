import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModalLogout } from './ModalLogout';

describe('ModalLogout', () => {
    test('renders the logout message', () => {
        render(<ModalLogout onClose={jest.fn()} />);
        const logoutTitle = screen.getByText('Logout realizado');
        const logoutMessage = screen.getByText('El usuario ha sido desconectado exitosamente');
        expect(logoutTitle).toBeInTheDocument();
        expect(logoutMessage).toBeInTheDocument();
    });

    test('renders the close button', () => {
        render(<ModalLogout onClose={jest.fn()} />);
        const closeButton = screen.getByText('Cerrar');
        expect(closeButton).toBeInTheDocument();
    });

    test('calls onClose when the close button is clicked', () => {
        const onClose = jest.fn();
        render(<ModalLogout onClose={onClose} />);
        const closeButton = screen.getByText('Cerrar');
        fireEvent.click(closeButton);
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});