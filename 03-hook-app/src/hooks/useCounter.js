import { useState } from "react";

export const useCounter = (initialValue = 10) => {
  const [counter, setCounter] = useState(initialValue);

  const handleIncrement = (value = 1) => {
    setCounter((current) => current + value);
  };

  const handleDecrement = (value = 1) => {
    setCounter((current) => current - value);
  };

  const handleReset = () => {
    setCounter(initialValue);
  };

  return {
    counter,
    handleIncrement,
    handleDecrement,
    handleReset,
  };
};
