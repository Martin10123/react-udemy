import {
  getHeroeById,
  getHeroesByOwner,
} from "../../src/base-pruebas/08-imp-exp";

describe("Pruebas en 08-imp-exp", () => {
  test("getHeroeById debe de retornar un heroe por el ID", () => {
    const heroe = getHeroeById(1);

    expect(heroe).toStrictEqual({ id: 1, name: "Batman", owner: "DC" });
  });

  test("getHeroeById debe de retornar undefine si el ID no existe", () => {
    const heroe = getHeroeById(44);

    expect(heroe).toBeFalsy();
  });

  test("Debe de retornar un arreglo con los heroes de DC", () => {
    const owner = "DC";
    const heroes = getHeroesByOwner(owner);

    expect(heroes).toEqual(heroes.filter((heroe) => heroe.owner === owner));

    // expect(heroes).toEqual([
    //   { id: 1, name: "Batman", owner: "DC" },
    //   { id: 3, name: "Superman", owner: "DC" },
    //   { id: 4, name: "Flash", owner: "DC" },
    // ]);

    expect(heroes.length).toBe(3);
  });

  test("Debe de retornar un arreglo con los heroes de Marvel", () => {
    const owner = "Marvel";
    const heroes = getHeroesByOwner(owner);

    expect(heroes).toEqual(heroes.filter((heroe) => heroe.owner === owner));

    // expect(heroes).toEqual([
    //   { id: 2, name: "Spiderman", owner: "Marvel" },
    //   { id: 5, name: "Wolverine", owner: "Marvel" },
    // ]);

    expect(heroes.length).toBe(2);
  });
});
