import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { startCreateingUserWithEmailPassword } from "../../store/auth";

const formData = {
  displayName: "",
  email: "",
  password: "",
};

const formValidations = {
  email: [(value) => value?.includes("@"), "El correo debe llevar @"],
  password: [
    (value) => value?.length >= 6,
    "El password debe tener más de 6 letras",
  ],
  displayName: [(value) => value?.length >= 1, "El nombre es obligatorio"],
};

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const {
    displayName,
    displayNameValid,
    email,
    emailValid,
    formState,
    isFormValid,
    onInputChange,
    password,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmitRegister = (e) => {
    e.preventDefault();
    if (!isFormValid) return setFormSubmitted(true);
    dispatch(startCreateingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Crear cuenta">
      <form
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={onSubmitRegister}
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              error={!!displayNameValid && formSubmitted}
              fullWidth
              helperText={displayNameValid}
              label="Nombre completo"
              name="displayName"
              onChange={onInputChange}
              placeholder="Martin Elias"
              type="text"
              value={displayName}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              error={!!emailValid && formSubmitted}
              fullWidth
              helperText={emailValid}
              label="Correo"
              name="email"
              onChange={onInputChange}
              placeholder="Correo@google.com"
              type="email"
              value={email}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              error={!!passwordValid && formSubmitted}
              fullWidth
              helperText={passwordValid}
              label="Contraseña"
              name="password"
              onChange={onInputChange}
              placeholder="Contraseña"
              type="password"
              value={password}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error"> {errorMessage} </Alert>
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 2 }}> ¿Ya tienes cuenta? </Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
