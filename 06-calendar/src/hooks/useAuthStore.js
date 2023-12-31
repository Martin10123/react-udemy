import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  clearErrorMessage,
  onChecking,
  onClearCalendar,
  onLogin,
  onLogout,
} from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    try {
      dispatch(onChecking());
      const { data } = await calendarApi.post("/auth", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    try {
      dispatch(onChecking());

      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      const { errors } = error.response.data;

      const errorSelected =
        error.response.data?.msg ||
        Object.entries(errors).map((error) => error[1].msg)[0];

      dispatch(onLogout(errorSelected));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get("/auth/renew");

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();

    dispatch(onLogout());
    dispatch(onClearCalendar());
  };

  return {
    //* Propiedades
    errorMessage,
    status,
    user,

    //* Metodos
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
  };
};
