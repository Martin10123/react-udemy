import { render, screen } from "@testing-library/react";
import { UserContext } from "../../src/09-useContext/context/UserContext";
import { HomePage } from "../../src/09-useContext/HomePage";

describe("Pruebas en el HomePage", () => {
  test("Debe de mostrar el componente sin usuario", () => {
    render(
      <UserContext.Provider value={{ user: null }}>
        <HomePage />
      </UserContext.Provider>
    );

    const preTag = screen.getByLabelText("pre");

    expect(preTag.innerHTML).toBe("null");
  });

  test("Debe de mostrar el componente con un usuario", () => {
    render(
      <UserContext.Provider value={{ user: { id: 1, name: "Martin" } }}>
        <HomePage />
      </UserContext.Provider>
    );

    const preTag = screen.getByLabelText("pre");

    expect(preTag.innerHTML).toContain("Martin");
    expect(preTag.innerHTML).toContain(`${1}`);
  });
});
