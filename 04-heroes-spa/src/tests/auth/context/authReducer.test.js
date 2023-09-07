import { authReducer } from "../../../auth/context/authReducer";
import { types } from "../../../auth/types/types";

describe("Pruebas en el authReducer", () => {
  test("Debe de retornar el estado por defecto", () => {
    const newState = authReducer({ loggued: false }, {});

    expect(newState).toEqual({ loggued: false });
  });

  test("Debe de llamar el login y autenticar y establecer el user", () => {
    const action = {
      type: types.login,
      payload: {
        id: "123",
        name: "hola",
      },
    };

    const newState = authReducer({}, action);

    expect(newState).toEqual({
      logged: true,
      user: action.payload,
    });
  });

  test("Debe de llamar el logout, borrar nombre y logged en false", () => {
    const state = {
      logged: true,
      user: {
        id: "123",
        name: "hola",
      },
    };

    const action = {
      type: types.logout,
    };

    const newState = authReducer({}, action);

    expect(newState).toEqual({
      logged: false,
    });
  });
});
