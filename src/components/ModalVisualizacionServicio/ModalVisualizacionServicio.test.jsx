import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalVisualizacionServicio from './ModalVisualizacionServicio';

describe('ModalVisualizacionServicio', () => {
    test('renders correctly', () => {
        //const service = { id: 1, name: 'Service 1', description: 'This is a test service' };
        render(<ModalVisualizacionServicio onClose={() => {}} />);
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('iPhone 12')).toBeInTheDocument();
    });

    test('calls onClose when close button is clicked', () => {
        const onCloseMock = jest.fn();
        render(<ModalVisualizacionServicio onClose={onCloseMock} />);
        fireEvent.click(screen.getByText('Close'));
        expect(onCloseMock).toHaveBeenCalled();
    });
});