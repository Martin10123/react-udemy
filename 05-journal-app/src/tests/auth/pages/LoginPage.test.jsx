import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../auth/pages/LoginPage";
import { authSlice } from "../../../store/auth";
import { startGoogleSignIn } from "../../../store/auth/thunks";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock("../../../store/auth/thunks", () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWothEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password });
  },
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => (fnn) => fnn(),
}));

beforeEach(() => jest.clearAllMocks());

describe("Pruebas en el componente de LoginPage", () => {
  test("Debe de mostrarse correctamente", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
  });

  test("Pruebas en el boton de google singIn, llamar startGoogleSingIn", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getByLabelText("google-btn");

    fireEvent.click(button);

    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test("Submit debe de llamar startLoginWithEmailPassword", () => {
    const email = "m@g.com";
    const password = "12";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole("textbox", { name: "Correo" });
    fireEvent.change(emailField, { target: { name: "email", value: email } });

    const passwordField = screen.getByTestId("password");
    fireEvent.change(passwordField, {
      target: { name: "password", value: password },
    });

    const submitForm = screen.getByLabelText("form");

    fireEvent.submit(submitForm);

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email,
      password,
    });
  });
});
