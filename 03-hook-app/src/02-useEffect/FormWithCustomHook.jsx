import { useEffect } from "react";
import { useForm } from "../hooks/useForm";

export const FormWithCustonHook = () => {
  const { onInputChange, username, email, password, onResetForm } = useForm({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log("Use Effect called");
  }, []);

  return (
    <>
      <h1>Simple Form</h1>
      <hr />

      <input
        type="text"
        className="form-control"
        placeholder="Username..."
        name="username"
        value={username}
        onChange={onInputChange}
      />

      <input
        type="email"
        className="form-control mt-2"
        placeholder="Martin@gmail.com"
        name="email"
        value={email}
        onChange={onInputChange}
      />

      <input
        type="password"
        className="form-control mt-2"
        placeholder="Mar*********"
        name="password"
        value={password}
        onChange={onInputChange}
      />

      <button onClick={onResetForm} className="btn btn-primary mt-2">
        Borrar
      </button>
    </>
  );
};
