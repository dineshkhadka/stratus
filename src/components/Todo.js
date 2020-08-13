import React from "react";

function Todo() {
  return (
    <>
      <div className="todo">
        <h2 className="primary-text">Stuff that needs to be done</h2>

        <ul className="todo__list">
          <li className="todo__item">
            <input type="checkbox" className="todo__toggle" />

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="checked"
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
              className="unchecked"
            >
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            <label className="todo__title">
              Convert the declaration new type of data to the tuple and the
              tructure to the integrity
            </label>
          </li>
          <li className="todo__item">
            <input type="checkbox" className="todo__toggle" />

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="checked"
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
              className="unchecked"
            >
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            <label className="todo__title">
              Redetermine the object postion and reset the coodrinates according
              the value
            </label>
          </li>
          <li className="todo__item">
            <input type="checkbox" className="todo__toggle" />

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="checked"
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
              className="unchecked"
            >
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            <label className="todo__title">
              Recalculate the flux capacitator and reinstate democracy in the
              height of the pandemic
            </label>
          </li>
          <li className="todo__item">
            <input type="checkbox" className="todo__toggle" />

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="checked"
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
              className="unchecked"
            >
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            <label className="todo__title">
              Recalculate the flux capacitator and reinstate democracy in the
              height of the pandemic
            </label>
          </li>
          <li className="todo__item">
            <input type="checkbox" className="todo__toggle" />

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="checked"
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
              className="unchecked"
            >
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            <label className="todo__title">
              Recalculate the flux capacitator and reinstate democracy in the
              height of the pandemic
            </label>
          </li>
          <li className="todo__item">
            <input type="checkbox" className="todo__toggle" />

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="checked"
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
              className="unchecked"
            >
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            <label className="todo__title">
              Recalculate the flux capacitator and reinstate democracy in the
              height of the pandemic
            </label>
          </li>
        </ul>
        <footer className="todo__footer">
          <div className="todo__new">
            <input type="text" placeholder="Add New task" />
            <button className="btn btn--clear">
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
          </div>
        </footer>
      </div>
    </>
  );
}

export default Todo;
