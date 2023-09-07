import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import { AppRouter } from "../../router/AppRouter";

describe("Pruebas en el Approuter", () => {
  test("Debe de mostrar el login si no está autenticado", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByText("Login").length).toBe(2);
  });

  test("Debe de mostrar el componente de Marvel si esta autenticado", () => {
    const contextValue = {
      logged: true,
      user: { id: "123", name: "Martin" },
    };

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Marvel Comics")).toBeTruthy();
    expect(screen.getByText(contextValue.user.name)).toBeTruthy();
  });
});
