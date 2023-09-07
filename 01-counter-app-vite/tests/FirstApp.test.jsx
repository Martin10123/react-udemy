import { render } from "@testing-library/react";
import FirstApp from "../src/FirstApp";

describe("Pruebas en el component FirstApp", () => {
  // test("Debe de hacer match con el snapshot", () => {
  //   const title = "Holaaaaaaaa";

  //   const { container } = render(<FirstApp title={title} />);

  //   expect(container).toMatchSnapshot()
  // });

  test("Debe de mostrar el titulo en un h1", () => {
    const title = "Holaaaaaaaa";

    const { container, getByText, getByTestId } = render(
      <FirstApp title={title} />
    );

    expect(getByText(title)).toBeTruthy();

    // const h1 = container.querySelector("h1");
    // expect(h1.innerHTML).toBe(title)

    expect(getByTestId("test-title").innerHTML).toContain(title);
  });

  test("Debe de mostrar el subtitulo enviado por props", () => {
    const title = "Holaaaaaaaa";
    const subTitle = "Hola, soy un subtitulo";

    const {  getAllByText  } = render(
      <FirstApp 
          title={title} 
          subTitle={subTitle} 
      />
    );

    expect(getAllByText(subTitle).length).toBe(2);

  });
});
