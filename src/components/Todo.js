import React, { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
const TodoItem = ({ todo, index, toggleCompleted, removeTodo }) => {
  return (
    <li className="todo__item">
      <input
        type="checkbox"
        className="todo__toggle"
        checked={todo.completed}
      />

      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="custom-radio checked"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="custom-radio unchecked"
      >
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
      <label className="todo__title" onClick={() => toggleCompleted(index)}>
        {todo.text}
      </label>
      <button
        className="btn btn--link btn--circle btn--remove"
        onClick={() => removeTodo(index)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M15 9l-6 6M9 9l6 6" />
        </svg>
      </button>
    </li>
  );
};

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useLocalStorage("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };
  return (
    <form className="todo__new" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add New task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="button"
        href="#"
        className="btn btn--clear"
        onClick={() => setValue("")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon-add"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      </button>
    </form>
  );
};

function Todo() {
  const [todo, setTodo] = useLocalStorage("stratus-todo", []);

  const toggleCompleted = (index) => {
    const newTodos = [...todo];
    newTodos[index].completed = !newTodos[index].completed;
    setTodo(newTodos);
  };
  const removeTodo = (index) => {
    const newTodos = [...todo];
    newTodos.splice(index, 1);
    setTodo(newTodos);
  };
  const addTodo = (text) => {
    const newTodos = [...todo, { text, completed: false }];
    setTodo(newTodos);
  };

  return (
    <>
      <div className="todo">
        <div className="todo__header">
          <h2 className="primary-text">Stuff that needs to be done</h2>
        </div>

        <ul className="todo__list">
          {todo.map((todo, index) => (
            <TodoItem
              key={index}
              index={index}
              todo={todo}
              toggleCompleted={toggleCompleted}
              removeTodo={removeTodo}
            />
          ))}
        </ul>
        <footer className="todo__footer">
          <TodoForm addTodo={addTodo} />
        </footer>
      </div>
    </>
  );
}

export default Todo;
