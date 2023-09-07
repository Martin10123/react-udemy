import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from "../../../store/auth/authSlice";
import {
  authenticatedState,
  demoUser,
  initialState,
  notAuthenticatedState,
} from "../../fixtures/authFixtures";

describe("Pruebas en el authSlice", () => {
  test('Debe de regresar el estado inicial y llamarse "auth"', () => {
    const state = authSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);
    expect(authSlice.name).toBe("auth");
  });

  test("Debe de realizar la autenticación", () => {
    const state = authSlice.reducer(initialState, login(demoUser));

    expect(state).toEqual({
      displayName: demoUser.displayName,
      email: demoUser.email,
      errorMessage: null,
      photoURL: demoUser.photoURL,
      status: "authenticated", // "checking, "authenticated"
      uid: demoUser.uid,
    });
  });

  test("Debe de realizar el logout sin argumentos", () => {
    const state = authSlice.reducer(authenticatedState, logout());

    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage: undefined,
    });
  });

  test("Debe de realizar el logout y mostrar un mensaje de error", () => {
    const errorMessage = "Credenciales no son correctas";
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    );

    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage,
    });
  });

  test("Debe de cambiar el estado a checking", () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());

    expect(state.status).toBe("checking");
  });
});
