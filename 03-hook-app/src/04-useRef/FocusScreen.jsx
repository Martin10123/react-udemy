import { useRef } from "react";

export const FocusScreen = () => {
  const inputRef = useRef();

  const onRef = () => {
    inputRef.current.select();
  };

  return (
    <>
      <h1>Focus Screen</h1>
      <hr />

      <input
        ref={inputRef}
        type="text"
        placeholder="Ingrese su nombre..."
        className="form-control"
      />

      <button onClick={onRef} className="btn btn-primary mt-2">
        Set focus
      </button>
    </>
  );
};
