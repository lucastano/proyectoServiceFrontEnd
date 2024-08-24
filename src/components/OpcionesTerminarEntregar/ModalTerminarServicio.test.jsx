import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ModalTerminarServicio from "./ModalTerminarServicio";

jest.mock("../../store/selectors", () => ({
  useServicioPorId: jest.fn(),
}));

jest.mock("../../store/effects", () => ({
  postTerminarReparacion: jest.fn(),
}));

describe.skip("ModalTerminarServicio", () => {
  test("renders without error", () => {
    render(<ModalTerminarServicio onClose={() => {}} idServicio={1} />);
    expect(screen.getByText("Terminar reparación")).toBeInTheDocument();
  });

  test("calls postTerminarReparacion with true when reparado button is clicked", () => {
    render(<ModalTerminarServicio onClose={() => {}} idServicio={1} />);

    // Mock postTerminarReparacion behavior for this test
    postTerminarReparacion.mockImplementation((data, callback) => callback());

    // Click the "reparado" button
    fireEvent.click(screen.getByText("Reparado"));

    // Verify postTerminarReparacion is called with expected arguments
    expect(postTerminarReparacion).toHaveBeenCalledWith({
      idReparacion: 1,
      fueReparada: true,
    }, expect.any(Function));
  });

  test("calls postTerminarReparacion with false when no reparado button is clicked", () => {
    render(<ModalTerminarServicio onClose={() => {}} idServicio={1} />);

    // Mock postTerminarReparacion behavior for this test
    postTerminarReparacion.mockImplementation((data, callback) => callback());

    // Click the "no reparado" button
    fireEvent.click(screen.getByText("No reparado"));

    // Verify postTerminarReparacion is called with expected arguments
    expect(postTerminarReparacion).toHaveBeenCalledWith({
      idReparacion: 1,
      fueReparada: false,
    }, expect.any(Function));
  });

  test("calls onClose prop when either button is clicked", () => {
    const mockOnClose = jest.fn();
    render(<ModalTerminarServicio onClose={mockOnClose} idServicio={1} />);

    // Click the "reparado" button
    fireEvent.click(screen.getByText("Reparado"));

    // Verify onClose is called
    expect(mockOnClose).toHaveBeenCalled();

    // Reset mock for next test
    mockOnClose.mockReset();

    // Click the "no reparado" button
    fireEvent.click(screen.getByText("No reparado"));

    // Verify onClose is called again
    expect(mockOnClose).toHaveBeenCalled();
  });
});
