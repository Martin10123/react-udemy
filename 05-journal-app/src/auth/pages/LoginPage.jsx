import { Link as RouterLink } from "react-router-dom";
import Google from "@mui/icons-material/Google";

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
import {
  startGoogleSignIn,
  startLoginWothEmailPassword,
} from "../../store/auth";
import { useMemo } from "react";

const formDate = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { email, password, onInputChange } = useForm(formDate);

  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmitLogin = (e) => {
    e.preventDefault();

    dispatch(startLoginWothEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        aria-label="form"
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={onSubmitLogin}
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
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
              fullWidth
              label="Contraseña"
              name="password"
              onChange={onInputChange}
              placeholder="Contraseña"
              type="password"
              value={password}
              inputProps={{
                "data-testid": "password",
              }}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error"> {errorMessage} </Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                aria-label="google-btn"
                disabled={isAuthenticating}
                fullWidth
                onClick={onGoogleSignIn}
                variant="contained"
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
