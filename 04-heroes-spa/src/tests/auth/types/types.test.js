import { types } from "../../../auth/types/types";

describe("Pruebas en los types", () => {
  test("Deben de mostrarse correctamente", () => {
    expect(types).toEqual({ login: "[Auth] Login", logout: "[Auth] Logout" });
  });
});
