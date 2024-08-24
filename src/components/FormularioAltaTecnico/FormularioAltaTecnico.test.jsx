import React from 'react';
import { render } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import FormularioAltaTecnico from './FormularioAltaTecnico';
import * as Selectors from "../../store/selectors";

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('../../store/effects', () => ({
  postTecnico: jest.fn(),
})); 

describe.skip('FormularioAltaTecnico', () => {
  let useRolSesionSpy;
  let useEmailSesionSpy;
  let useDispatchSpy;
  let mockPostTecnico;

  beforeEach(() => {
    useEmailSesionSpy = jest.spyOn(Selectors, 'useEmailSesion');
    useRolSesionSpy = jest.spyOn(Selectors, 'useRolSesion');
    useDispatchSpy = jest.fn();
    mockPostTecnico = jest.fn();
    reactRedux.useDispatch.mockReturnValue(useDispatchSpy);
  });

  it('should render the form correctly for authorized users', () => {
    useEmailSesionSpy.mockReturnValue('test@test.com');
    useRolSesionSpy.mockReturnValue('Administrador');

    const component = render(<FormularioAltaTecnico />);
    const { getByLabelText, getByText } = component;

    expect(getByLabelText('Nombre:')).toBeInTheDocument();
    expect(getByLabelText('Apellido:')).toBeInTheDocument();
    expect(getByLabelText('Email:')).toBeInTheDocument();
    expect(getByLabelText('Contraseña:')).toBeInTheDocument();
    expect(getByText('Registrar tecnico')).toBeInTheDocument();
  });});
