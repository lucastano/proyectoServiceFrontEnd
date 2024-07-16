import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ModalIngresarPresupuesto from "./ModalIngresarPresupuesto";

describe.skip("ModalIngresarPresupuesto", () => {
    it("should render the modal component", () => {
        const onClose = jest.fn();
        const idServicio = 1;

        const { getByText } = render(
            <ModalIngresarPresupuesto onClose={onClose} idServicio={idServicio} />
        );

        const modalTitle = getByText("Ingresar Presupuesto");
        expect(modalTitle).toBeInTheDocument();
    });

        it('Should complete input values correctly', () => {
            const onClose = jest.fn();
            const idServicio = 1;

            const { getByLabelText, getByText } = render(
                <ModalIngresarPresupuesto onClose={onClose} idServicio={idServicio} />
            );

            const manoDeObraInput = getByLabelText("Mano de obra:");
            const fechaInput = getByLabelText("Fecha promesa de entrega:");
            const descripcionInput = getByLabelText("Descripcion:");
            const guardarButton = getByText("Ingresar Presupuest");

            fireEvent.change(manoDeObraInput, { target: { value: "100" } });
            fireEvent.change(fechaInput, { target: { value: "2022-01-01" } });
            fireEvent.change(descripcionInput, { target: { value: "Sample description" } });
            fireEvent.click(guardarButton);

            expect(manoDeObraInput.value).toBe("100");
            expect(fechaInput.value).toBe("2022-01-01");
            expect(descripcionInput.value).toBe("Sample description");
            expect(onClose).toHaveBeenCalled();
        });

    it("should handle errors correctly", () => {
        const onClose = jest.fn();
        const idServicio = 1;
    
        global.fetch = jest.fn(() =>
            Promise.reject(new Error('Fetch error'))
        );
    
        console.error = jest.fn();
    
        const { getByText, rerender } = render(
            <ModalIngresarPresupuesto onClose={onClose} idServicio={idServicio} />
        );
    
        // Wait for any asynchronous actions to complete
        rerender(<ModalIngresarPresupuesto onClose={onClose} idServicio={idServicio} />);
    
        const errorToast = getByText('Ha habido un error al ingresar el presupuesto');
        expect(errorToast).toBeInTheDocument();
        expect(console.error).toHaveBeenCalled();
    });

});