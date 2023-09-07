import { useTodos } from "../hooks/useTodos";
import { TodoAdd } from "./TodoAdd";
import { TodoList } from "./TodoList";

export const TodoApp = () => {
  const {
    todos,
    todosCount,
    pendingTodosCount,
    handleDeleteTodo,
    onToggleTodo,
    handleAddTodo,
  } = useTodos();

  return (
    <>
      <h1>
        Todo app ({todosCount}) <small>Pendientes: {pendingTodosCount}</small>
      </h1>
      <hr />

      <div className="row">
        <div className="col-7">
          <TodoList
            todos={todos}
            onDeleteTodo={handleDeleteTodo}
            onToggleTodo={onToggleTodo}
          />
        </div>

        <div className="col-5">
          <h4>Agregar todo</h4>
          <hr />

          <TodoAdd onNewTodo={handleAddTodo} />
        </div>
      </div>
    </>
  );
};
