import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../auth/context/AuthContext";
import { Navbar } from "../../../ui/components/Navbar";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Pruebas en el Navbar", () => {
  const onLogout = jest.fn();

  const contextValue = {
    logged: true,
    user: { id: "123", name: "Martin" },
    logout: onLogout,
  };

  beforeEach(() => jest.clearAllMocks());

  test("Debe de aparecer el nombre de la persona logueada", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(contextValue.user.name)).toBeTruthy();
  });

  test("Debe de llamar el navigate cuando clickeas el logout", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onLogout).toHaveBeenCalled();
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/login", {
      replace: true,
    });
  });
});
