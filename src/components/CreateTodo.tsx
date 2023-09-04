import {
  ChangeEvent, FormEvent, useState, FC,
} from 'react';
import { useTodos } from '../context/Todos';

const CreateTodo: FC = function () {
  const [todo, setTodo] = useState<string>('');
  const { handleAddTodo } = useTodos();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddTodo(todo);
    setTodo('');
  };

  return (
    <div className="create-todo-wrapper">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={todo}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => setTodo(e.target.value)}
          className="todo-input"
          placeholder="Add text"
          required
        />
        <button type="submit" className="add-btn">Add</button>
      </form>
    </div>
  );
};

export default CreateTodo;
