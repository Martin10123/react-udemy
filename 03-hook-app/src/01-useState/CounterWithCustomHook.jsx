import { useCounter } from "../hooks/useCounter";

export const CounterWithCustomHook = () => {
  const { counter, handleDecrement, handleIncrement, handleReset } =
    useCounter();

  return (
    <>
      <h1>Counter With Hook: {counter} </h1>
      <hr />
      <button className="btn btn-primary" onClick={() => handleIncrement(2)}>
        +1
      </button>
      <button className="btn btn-primary" onClick={handleReset}>
        Reset
      </button>
      <button className="btn btn-primary" onClick={() => handleDecrement(2)}>
        -1
      </button>
    </>
  );
};
