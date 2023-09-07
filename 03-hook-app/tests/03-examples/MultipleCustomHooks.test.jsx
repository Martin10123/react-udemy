import { fireEvent, render, screen } from "@testing-library/react";
import { MultipleCustomHooks } from "../../src/03-examples/MultipleCustomHooks";
import { useFetch, useCounter } from "../../src/hooks";

jest.mock("../../src/hooks/useFetch.js");
jest.mock("../../src/hooks/useCounter.js");

describe("Pruebas en el componente MultipleCustomHooks", () => {
  const handleIncrement = jest.fn();

  useCounter.mockReturnValue({
    counter: 1,
    handleIncrement,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe de mostrar el componente por defecto", () => {
    useFetch.mockReturnValue({
      data: null,
      isLoading: true,
      hasError: null,
    });

    render(<MultipleCustomHooks />);

    expect(screen.getByText("Loading..."));
    expect(screen.getByText("BreakingBad quotes"));

    const nextButton = screen.getByRole("button", { name: "Next quote" });

    expect(nextButton.disabled).toBeTruthy();
  });

  test("Debe de mostrar un quote", () => {
    useFetch.mockReturnValue({
      data: [{ author: "Martin", quote: "Hola mundo" }],
      isLoading: false,
      hasError: null,
    });

    render(<MultipleCustomHooks />);

    expect(screen.getByText("Hola mundo")).toBeTruthy();
    expect(screen.getByText("Martin")).toBeTruthy();
    const nextButton = screen.getByRole("button", { name: "Next quote" });

    expect(nextButton.disabled).toBeFalsy();
  });

  test("Debe de llamar la funcion de incrementar", () => {
    useFetch.mockReturnValue({
      data: [{ author: "Martin", quote: "Hola mundo" }],
      isLoading: false,
      hasError: null,
    });

    render(<MultipleCustomHooks />);

    const nextButton = screen.getByRole("button", { name: "Next quote" });

    fireEvent.click(nextButton);

    expect(handleIncrement).toHaveBeenCalled();
  });
});
