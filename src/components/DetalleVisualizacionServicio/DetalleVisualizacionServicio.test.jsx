import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalVisualizacionServicio from './ModalVisualizacionServicio';
import * as Selectors from '../../store/selectors';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const servicioMock = {
  id: 5,
  fecha: "2024-07-09T00:37:03.634Z",
  clienteNombre: "TestNombre",
  clienteApellido: "TestApellido",
  clienteCedula: "12345678",
  clienteEmail: "test@test.com",
  clienteTelefono: "26962412",
  clienteDireccion: "Callecita 123",
  producto: "iPod",
  numeroSerie: "11223344",
  descripcion: "item de prueba",
  estado: "Presupuestado",
  descripcionPresupuesto: "Presupuesto de prueba",
  costo: 100
};

describe.skip('ModalVisualizacionServicio', () => {

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test('renders modal content with service data', () => {
    const mockStore = configureStore(); // Create mock store

    const mockState = { // Update with your actual initialState
      servicios: [servicioMock], // Array of service objects
      clientes: [],
      repuestos: [],
      tecnicos: [],
      admins: [],
      sesion: null,
      error: null,
    };

    const store = mockStore(mockState);

    render(
      <Provider store={store}>
        <ModalVisualizacionServicio onClose={() => {}} idServicio={5} />
      </Provider>
    );

    expect(screen.getByText('Servicio No: 5')).toBeInTheDocument();
    expect(screen.getByText('TestNombre TestApellido')).toBeInTheDocument();

    // Assertions for other service data fields
    // ... (same assertions as before)
  });

  test('calls onClose when close button is clicked', () => {
    const mockStore = configureStore(); // Create mock store (can be empty for this test)

    const onCloseMock = jest.fn();
    render(
      <Provider store={mockStore}>
        <ModalVisualizacionServicio onClose={onCloseMock} idServicio={5} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Close'));

    expect(onCloseMock).toHaveBeenCalledTimes(1); // Assert that onClose is called exactly once
  });
});
