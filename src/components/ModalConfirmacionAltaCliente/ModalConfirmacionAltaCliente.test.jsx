import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ModalConfirmacionAltaCliente } from './ModalConfirmacionAltaCliente';

describe('ModalConfirmacionAltaCliente', () => {
    it('should render without errors', () => {
        render(<ModalConfirmacionAltaCliente onClose={() => {}} />);
    });

    it('should call onClose when the modal is closed', () => {
        const onCloseMock = jest.fn();
        const { getByRole } = render(<ModalConfirmacionAltaCliente onClose={onCloseMock} />);
        const closeButton = getByRole('button');

        fireEvent.click(closeButton);

        expect(onCloseMock).toHaveBeenCalled();
    });
});