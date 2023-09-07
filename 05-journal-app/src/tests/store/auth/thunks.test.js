import {
  loginWithEmailPassword,
  logoutFirebase,
  singInWithGoogle,
} from "../../../firebase/providers";
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginWothEmailPassword,
} from "../../../store/auth/thunks";
import {
  checkingCredentials,
  login,
  logout,
  startLogout,
} from "../../../store/auth";
import { demoUser } from "../../fixtures/authFixtures";
import { clearNotesLogout } from "../../../store/journal/journalSlice";

jest.mock("../../../firebase/providers");

describe("Pruebas en los thunks", () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("Debe de invocar el checkingCredentials", async () => {
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("startGoogleSingIn debe de llamar checkingCredentials y login - Exito", async () => {
    const loginData = { ok: true, ...demoUser };

    await singInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startGoogleSingIn debe de llamar checkingCredentials y logout - Error", async () => {
    const loginData = { ok: false, errorMesage: "Error en Google" };

    await singInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });

  test("startLoginWothEmailPassword debe de llamar checkingCredentials y login - Exito", async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: "12345" };

    await loginWithEmailPassword.mockResolvedValue(loginData);

    await startLoginWothEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(demoUser));
  });

  test("startLogout debe de llamar checkingCredentials y login - Exito", async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(logout());
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
  });
});
