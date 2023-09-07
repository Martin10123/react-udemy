import { useCounter } from "../../src/hooks/useCounter";

import { act, renderHook } from "@testing-library/react";

describe("Pruebas en el useCounter", () => {
  test("Debe de retornar los valores por defecto", () => {
    const { result } = renderHook(() => useCounter());

    const { counter, handleIncrement, handleDecrement, handleReset } =
      result.current;

    expect(counter).toBe(10);
    expect(handleIncrement).toEqual(expect.any(Function));
    expect(handleDecrement).toEqual(expect.any(Function));
    expect(handleReset).toEqual(expect.any(Function));
  });

  test("Debe de generar el counter con el valor de 100", () => {
    const { result } = renderHook(() => useCounter(100));

    const { counter } = result.current;

    expect(counter).toBe(100);
  });

  test("Debe de incrementar el counter", () => {
    const { result } = renderHook(() => useCounter());

    const { handleIncrement } = result.current;

    act(() => {
      handleIncrement();
      handleIncrement(5);
    });

    expect(result.current.counter).toBe(16);
  });

  test("Debe de decrementar el counter", () => {
    const { result } = renderHook(() => useCounter());

    const { handleDecrement } = result.current;

    act(() => {
      handleDecrement();
      handleDecrement(5);
    });

    expect(result.current.counter).toBe(4);
  });

  test("Debe de resetear el counter", () => {
    const { result } = renderHook(() => useCounter());

    const { handleDecrement, handleReset } = result.current;

    act(() => {
      handleDecrement(5);
      handleReset();
    });

    expect(result.current.counter).toBe(10);
  });
});
