import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Todo, useTodos } from '../context/Todos';

const ListTodo: React.FC = function () {
  const { todos, handleTodoComplete, handleTodoDelete } = useTodos();
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [searchParam] = useSearchParams();
  const filter = searchParam.get('todos');

  useEffect(() => {
    if (filter === 'active') {
      setFilteredTodos(todos.filter((todo) => !todo.isCompleted));
    } else if (filter === 'completed') {
      setFilteredTodos(todos.filter((todo) => todo.isCompleted));
    } else {
      setFilteredTodos(todos);
    }
  }, [filter, todos]);

  return (
    <div className="todo-list-wrapper">
      {filteredTodos.length
        ? filteredTodos.map(({
          id, isCompleted, task, timeTaken,
        }) => (
          <div key={id} className="todo-box">
            <input
              type="checkbox"
              id={`todo-${id}`}
              checked={isCompleted}
              onChange={() => handleTodoComplete(id)}
            />
            <label
              htmlFor={`todo-${id}`}
              className={`todo-text ${
                isCompleted ? 'strike-out-text' : ''
              }`}
            >
              {task}
            </label>
            {isCompleted ? (
              <>
                <span className="time-taken">
                  <span>
                    <span>{timeTaken?.split(':')[0] || ''}</span>
                    <span className="time-colon">:</span>
                  </span>
                  <span>
                    <span>{timeTaken?.split(':')[1] || ''}</span>
                    <span className="time-colon">:</span>
                  </span>
                  <span>{timeTaken?.split(':')[2] || ''}</span>
                </span>
                <button
                  onClick={() => handleTodoDelete(id)}
                  type="button"
                  className="delete-button"
                >
                  Delete
                </button>
              </>
            ) : null}
          </div>
        ))
        : null}
    </div>
  );
};

export default ListTodo;
