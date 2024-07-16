import React from "react";
import { render, fireEvent } from "@testing-library/react";
import OpcionesPresupuesto from "./OpcionesPresupuesto";
import ModalIngresarPresupuesto from "./ModalIngresarPresupuesto";

describe.skip("OpcionesPresupuesto", () => {

    beforeEach(() => {

    })
    it("renders without error", () => {
        render(<OpcionesPresupuesto />);
    });

    it("calls postAceptarPresupuesto when accept button is clicked", () => {
        const mockPostAceptarPresupuesto = jest.fn();
        jest.mock("../../store/effects", () => ({
            postAceptarPresupuesto: mockPostAceptarPresupuesto,
        }));

        const { getByText } = render(<OpcionesPresupuesto idServicio={'1234'}/>);
        const acceptButton = getByText("Aceptar");

        fireEvent.click(acceptButton);

        expect(mockPostAceptarPresupuesto).toHaveBeenCalled();
    });

    it("opens ModalIngresarPresupuesto when enter button is clicked", () => {
        const { getByText } = render(<OpcionesPresupuesto idServicio={'1234'}/>);
        const enterButton = getByText("Presupuestar");

        fireEvent.click(enterButton);

        expect(<ModalIngresarPresupuesto onClose={() => {}} idServicio={'1234'} />).toBeInTheDocument();
    });

    it("opens ModalRechazarPresupuesto when reject button is clicked", () => {
        const { getByText, getByTestId } = render(<OpcionesPresupuesto idServicio={'1234'}/>);
        const rejectButton = getByText("Rechazar");

        fireEvent.click(rejectButton);

        const modalRechazarPresupuesto = getByTestId("modal-rechazar-presupuesto");
        expect(<ModalRechazarPresupuesto onClose={() => {}} idServicio={'1234'} />).toBeInTheDocument();
    });
});