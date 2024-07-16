import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ModalRechazarPresupuesto from "./ModalRechazarPresupuesto";

describe.skip("ModalRechazarPresupuesto", () => {
    it("renders without error", () => {
        render(<ModalRechazarPresupuesto onClose={() => {}} idServicio={1} />);
    });

    it("calls postRechazarPresupuesto when submit button is clicked", () => {
        const postRechazarPresupuesto = jest.fn();
        const { getByTestId } = render(
            <ModalRechazarPresupuesto
                onClose={() => {}}
                idServicio={1}
                postRechazarPresupuesto={postRechazarPresupuesto}
            />
        );

        fireEvent.click(getByText("Rechazar Presupuesto"));

        expect(postRechazarPresupuesto).toHaveBeenCalled();
    });

    it("displays a toast message when postRechazarPresupuesto is successful", () => {
        const { getByText } = render(
            <ModalRechazarPresupuesto onClose={() => {}} idServicio={1} />
        );

        fireEvent.click(getByText("Rechazar Presupuesto"));

        // Assert that a toast message is displayed
        expect(getByText('El presupuesto ha sido rechazado correctamente')).toBeInTheDocument();
    });
});