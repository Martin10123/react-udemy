import { render, screen } from "@testing-library/react";
import FirstApp from "../src/FirstApp";

describe("Pruebas en el component FirstApp", () => {
  const title = "Holaaaaaaaa";
  const subTitle = "Hola, soy un subtitulo";

  test("Debe de hacer match con el snapshot", () => {
    const { container } = render(<FirstApp title={title} />);

    expect(container).toMatchSnapshot();
  });

  test("Debe de mostrar el mensaje de la variable title", () => {
    render(<FirstApp title={title} />);

    expect(screen.getByText(title)).toBeTruthy();
  });

  test("Debe de mostrar el titulo en un h1", () => {
    render(<FirstApp title={title} />);

    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toContain(
      title
    );
  });

  test("Debe de mostrar el subtitulo enviado por props", () => {
    render(<FirstApp title={title} subTitle={subTitle} />);

    expect(screen.getAllByText(subTitle).length).toBe(2);
  });
});
