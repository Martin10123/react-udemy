import { useForm } from "../hooks/useForm";

export const TodoAdd = ({ onNewTodo }) => {
  const { description, onInputChange, onResetForm } = useForm({
    description: "",
  });

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (description.length <= 1) return;

    const newTodo = {
      id: new Date().getTime(),
      description,
      done: false,
    };

    onNewTodo(newTodo);

    onResetForm();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="¿Que hay que hacer?"
        name="description"
        value={description}
        onChange={onInputChange}
        className="form-control"
      />

      <button type="submit" className="btn btn-outline-primary mt-2">
        Agregar
      </button>
    </form>
  );
};
