import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  singInWithGoogle,
} from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await singInWithGoogle();

    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startCreateingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({
        displayName,
        email,
        password,
      });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(
      login({
        displayName,
        email,
        photoURL,
        uid,
      })
    );
  };
};

export const startLoginWothEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { displayName, ok, photoURL, uid, errorMessage } =
      await loginWithEmailPassword({ email, password });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(
      login({
        displayName,
        email,
        photoURL,
        uid,
      })
    );
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();

    dispatch(clearNotesLogout());
    dispatch(logout());
  };
};
