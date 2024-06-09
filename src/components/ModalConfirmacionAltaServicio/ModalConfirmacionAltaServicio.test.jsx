import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ModalConfirmacionAltaServicio } from './ModalConfirmacionAltaServicio';

describe('ModalConfirmacionAltaServicio', () => {
    it('should render without errors', () => {
        render(<ModalConfirmacionAltaServicio onClose={() => {}} />);
    });

    it('should call onClose when the modal is closed', () => {
        const onCloseMock = jest.fn();
        const { getByRole } = render(<ModalConfirmacionAltaServicio onClose={onCloseMock} />);
        const closeButton = getByRole('button');

        fireEvent.click(closeButton);

        expect(onCloseMock).toHaveBeenCalled();
    });

});