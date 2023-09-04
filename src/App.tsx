import './App.css';
import CreateTodo from './components/CreateTodo';
import ListTodo from './components/ListTodo';
import TodoFilterNav from './components/TodoFilterNav';

function App() {
  return (
    <section className="main-wrapper">
      <h1>Tods App With Typescript</h1>
      <TodoFilterNav />
      <CreateTodo />
      <ListTodo />
    </section>
  );
}

export default App;
