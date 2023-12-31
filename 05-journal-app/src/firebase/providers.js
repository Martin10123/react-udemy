import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.code,
    };
  }
};

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;

    await updateProfile(FirebaseAuth.currentUser, {
      displayName,
    });

    return {
      displayName,
      email,
      ok: true,
      photoURL,
      uid,
    };
  } catch (error) {
    return {
      errorMessage: error.code,
      ok: false,
    };
  }
};

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const { user } = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const { uid, displayName, photoURL } = user;

    return {
      displayName,
      email,
      ok: true,
      photoURL,
      uid,
    };
  } catch (error) {
    return {
      errorMessage: error.code,
      ok: false,
    };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
