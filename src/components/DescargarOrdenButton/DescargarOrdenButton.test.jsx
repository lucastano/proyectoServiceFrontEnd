import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { toast } from "keep-react";
import DescargarOrdenButton from "./DescargarOrdenButton";
import { getOrden } from "../../dataFetcher";

global.URL.createObjectURL = jest.fn(() => "http://dummy.url");
global.URL.revokeObjectURL = jest.fn();
global.Blob = jest.fn();


const originalCreateElement = document.createElement.bind(document);
document.createElement = jest.fn((tagName) => {
    const element = originalCreateElement(tagName);
    if (tagName === 'a') {
      element.href = '';
      element.download = '';
      element.click = jest.fn();
    }
    return element;
  });
/*
global.document.body.appendChild = jest.fn();
global.document.body.removeChild = jest.fn();
*/
jest.mock("../../dataFetcher");
jest.mock("keep-react", () => ({
  ...jest.requireActual("keep-react"),
  toast: {
    error: jest.fn(),
  },
}));

describe("DescargarOrdenButton", () => {
  test("renders without errors", async () => {
    render(<DescargarOrdenButton idServicio="123" />);

    await waitFor(() => {
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
      });
  });

  test("calls getOrden function when clicked", async () => {
    const mockGetOrden = jest.fn();
    getOrden.mockResolvedValue(btoa("mockValue"));
    render(<DescargarOrdenButton idServicio="123" />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    await waitFor(() => expect(getOrden).toHaveBeenCalledWith("123"));
  });

  test("displays error toast when getOrden returns null", async () => {
    getOrden.mockResolvedValue(null);
    render(<DescargarOrdenButton idServicio="123" />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Error al generar orden"));
  });

  test("creates and clicks new link when getOrden returns non-null value", async () => {
    getOrden.mockResolvedValue(btoa("mockValue")); // mockValue should be a valid base64 string
    const createElementSpy = jest.spyOn(document, "createElement");
    const appendChildSpy = jest.spyOn(document.body, "appendChild");
    const removeChildSpy = jest.spyOn(document.body, "removeChild");
    render(<DescargarOrdenButton idServicio="123" />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    await waitFor(() => {
      expect(createElementSpy).toHaveBeenCalledWith("a");
      expect(appendChildSpy).toHaveBeenCalled();
      expect(removeChildSpy).toHaveBeenCalled();
    });
  });
});