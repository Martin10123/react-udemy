import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../heroes/pages/SearchPage";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Pruebas en el SearchPage", () => {
  beforeEach(() => jest.clearAllMocks());

  test("Debe de mostrarse correctamente con valores por defecto", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  test("Debe de mostrar a Batman y el input con el valor del queryString", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");

    expect(input.value).toBe("batman");

    const img = screen.getByRole("img");
    expect(img.src).toContain("/assets/heroes/dc-batman.jpg");

    const divSearch = screen.getByLabelText("div-search");
    const divError = screen.getByLabelText("div-error");

    expect(divSearch.style.display).toBe("none");
    expect(divError.style.display).toBe("none");
  });

  test("Debe de mostrar un error si no es encuentra el hero (batman123)", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const divError = screen.getByLabelText("div-error");
    expect(divError.style.display).not.toBe("none");
  });

  test("Debe de llamar el navigate a la pantalla nueva", () => {
    const inputValue = "superman";

    render(
      <MemoryRouter initialEntries={[`/search?q=${inputValue}`]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    const form = screen.getByLabelText("form");

    fireEvent.input(input, { target: { value: inputValue } });
    fireEvent.submit(form);

    expect(mockedUsedNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);
  });
});
