import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (todo) => {
    const action = {
      type: "[TODO] Add todo",
      payload: todo,
    };

    dispatch(action);
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: "[TODO] Remove todo",
      payload: id,
    });
  };

  const onToggleTodo = (id) => {
    dispatch({
      type: "[TODO] Toggle todo",
      payload: id,
    });
  };

  const todosCount = todos.length;

  const pendingTodosCount = todos.filter((todo) => !todo.done).length;

  return {
    todos,
    todosCount,
    pendingTodosCount,
    handleDeleteTodo,
    onToggleTodo,
    handleAddTodo,
  };
};
