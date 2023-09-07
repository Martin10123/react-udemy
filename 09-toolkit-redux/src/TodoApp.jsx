import { useState } from "react";
import { useGetTodoQuery, useGetTodosQuery } from "./store/apis";

export const TodoApp = () => {
  const [todoID, setTodoID] = useState(1);

  const { data: todo, isLoading } = useGetTodoQuery(todoID);

  const nextTodo = () => {
    setTodoID(todoID + 1);
  };

  const prevTodo = () => {
    if (todoID === 1) return;

    setTodoID(todoID - 1);
  };

  return (
    <>
      <h1>Todo - RTK Query</h1>
      <hr />
      <h4>isLoading: {isLoading ? "true" : "false"}</h4>

      <pre> {JSON.stringify(todo)} </pre>

      {/* <ul>
        {todo.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.completed ? "done " : "pending "}</strong>
            {todo.title}
          </li>
        ))}
      </ul> */}

      <button onClick={nextTodo}>Next page</button>
      <button onClick={prevTodo}>Prev page</button>
    </>
  );
};
