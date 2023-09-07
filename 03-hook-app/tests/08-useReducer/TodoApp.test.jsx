import { render, screen } from "@testing-library/react";
import { TodoApp } from "../../src/08-useReducer/TodoApp";
import { useTodos } from "../../src/hooks/useTodos";

jest.mock("../../src/hooks/useTodos");

describe("Pruebas en el TodoApp", () => {
  useTodos.mockReturnValue({
    todos: [
      { id: 1, description: "Hola mundo", done: false },
      { id: 2, description: "Hola mundo2", done: true },
    ],
    todosCount: 2,
    pendingTodosCount: 1,
    handleDeleteTodo: jest.fn(),
    onToggleTodo: jest.fn(),
    handleAddTodo: jest.fn(),
  });

  test("Debe de mostrar el componente correctamente", () => {
    render(<TodoApp />);

    expect(screen.getByText("Hola mundo")).toBeTruthy();
    expect(screen.getByText("Hola mundo2")).toBeTruthy();
    expect(screen.getByRole("textbox")).toBeTruthy();
  });
});
