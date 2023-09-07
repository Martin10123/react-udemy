import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementBy } from "./store/slices/counter";

import "./App.css";

function App() {
  const { counter } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleIncrementBy = () => {
    dispatch(incrementBy(2));
  };

  return (
    <div className="App">
      <h1>count is {counter}</h1>
      <div className="card">
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
        <button onClick={handleIncrementBy}>Increment by 2</button>
      </div>
    </div>
  );
}

export default App;
