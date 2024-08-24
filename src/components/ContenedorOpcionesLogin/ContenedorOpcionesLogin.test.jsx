import React from 'react';
import { render} from '@testing-library/react';
import ContenedorOpcionesLogin from './ContenedorOpcionesLogin';

//FUNCIONA BIEN CONFIRMADO
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

});