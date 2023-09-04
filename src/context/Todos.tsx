import {
  ReactNode,
  createContext,
  useState,
  useContext,
  FC,
  useEffect,
} from 'react';
import { calculateTimeTaken, formatTime } from '../utils';

export interface TodosProviderProps {
  children: ReactNode;
}

export interface Todo {
  id: string;
  task: string;
  createdAt: Date;
  isCompleted: boolean;
  timeTaken?: string;
}

export interface TodoContextType {
  todos: Todo[];
  handleAddTodo: (task: string) => void;
  handleTodoComplete: (id: string) => void;
  handleTodoDelete: (id: string) => void;
}

export const TodosContext = createContext<TodoContextType | null>(null);

export const TodosProvider: FC<TodosProviderProps> = function ({ children }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const todosLocalStorage: Todo[] = JSON.parse(localStorage.getItem('todos') as string) ?? [];
    if (todosLocalStorage.length) {
      setTodos(todosLocalStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (task: string) => {
    setTodos((prev) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task,
          createdAt: new Date(),
          isCompleted: false,
        },
        ...prev,
      ];
      return newTodos;
    });
  };

  const handleTodoComplete = (id: string) => {
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => {
      if (todo.id === id) {
        const isCompleted = !todo.isCompleted;
        const updatedTodo = {
          ...todo,
          isCompleted,
        };

        if (isCompleted) {
          updatedTodo.timeTaken = formatTime(
            calculateTimeTaken(todo.createdAt),
          );
        }
        return updatedTodo;
      }
      return todo;
    }));
  };

  const handleTodoDelete = (id: string) => {
    setTodos((prev: Todo[]) => prev.filter((todo: Todo) => todo.id !== id));
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        handleAddTodo,
        handleTodoComplete,
        handleTodoDelete,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const todosConsumer = useContext(TodosContext);
  if (!todosConsumer) {
    throw new Error('useTodos used outside of provider');
  }

  return todosConsumer;
};
