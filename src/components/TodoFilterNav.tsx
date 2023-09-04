import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const TodoFilterNav: React.FC = function () {
  const [searchparams] = useSearchParams();
  const activepath = searchparams.get('todos');

  return (
    <div className="nav">
      <Link to="/" className={`nav-item ${!activepath ? 'nav-item-active' : ''}`}>All</Link>
      <Link to="/?todos=active" className={`nav-item ${activepath === 'active' ? 'nav-item-active' : ''}`}>Active</Link>
      <Link to="/?todos=completed" className={`nav-item ${activepath === 'completed' ? 'nav-item-active' : ''}`}>Completed</Link>
    </div>
  );
};

export default TodoFilterNav;
