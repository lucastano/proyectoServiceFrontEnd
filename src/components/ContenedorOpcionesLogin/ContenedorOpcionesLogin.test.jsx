import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ContenedorOpcionesLogin } from './ContenedorOpcionesLogin';

jest.mock('./ModalLoginCliente/ModalLoginCliente', () => ({
    ModalLoginCliente: jest.fn(() => <div data-testid="modal-login-cliente" />)
}));

jest.mock('./ModalLoginTecnico/ModalLoginTecnico', () => ({
    ModalLoginTecnico: jest.fn(() => <div data-testid="modal-login-tecnico" />)
}));

jest.mock('./ModalLoginAdmin/ModalLoginAdmin', () => ({
    ModalLoginAdmin: jest.fn(() => <div data-testid="modal-login-admin" />)
}));

describe('ContenedorOpcionesLogin', () => {
    it('renders without crashing', () => {
        render(<ContenedorOpcionesLogin />);
    });

    it('renders the ModalLoginCliente component when "Cliente" button is clicked', () => {
        const { getByText, getByTestId } = render(<ContenedorOpcionesLogin />);
        const clienteButton = getByText('Como cliente');
        fireEvent.click(clienteButton);
        expect(getByTestId('modal-login-cliente')).toBeInTheDocument();
    });

    it('renders the ModalLoginTecnico component when "Técnico" button is clicked', () => {
        const { getByText, getByTestId } = render(<ContenedorOpcionesLogin />);
        const tecnicoButton = getByText('Como tecnico');
        fireEvent.click(tecnicoButton);
        expect(getByTestId('modal-login-tecnico')).toBeInTheDocument();
    });

    it('renders the ModalLoginAdmin component when "Admin" button is clicked', () => {
        const { getByText, getByTestId } = render(<ContenedorOpcionesLogin />);
        const adminButton = getByText('Como admin');
        fireEvent.click(adminButton);
        expect(getByTestId('modal-login-admin')).toBeInTheDocument();
    });

    it('does not render any modal component initially', () => {
        const { queryByTestId } = render(<ContenedorOpcionesLogin />);
        expect(queryByTestId('modal-login-cliente')).toBeNull();
        expect(queryByTestId('modal-login-tecnico')).toBeNull();
        expect(queryByTestId('modal-login-admin')).toBeNull();
    });
});