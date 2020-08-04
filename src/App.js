import React from "react";
import "./scss/style.scss";

function App() {
  return (
    <>
      <main className="app-container">
        <div className="app-primary">
          <div className="spotlight">
            <h2 className="primary-text">Good Day Dinesh Khadka, Today is</h2>
            <div className="spotlight__date">
              <div className="current-date">
                <div className="current-date__top">
                  <div className="current-date__primary">
                    <h1 className="current-date__day">
                      16<sup>th</sup>
                    </h1>
                    <h2 className="current-date__month">Ashoj</h2>
                  </div>
                  <div className="current-date__secondary">
                    <div className="current-date__time">
                      <span>09:53 AM</span>
                    </div>
                  </div>
                </div>

                <div className="current-date__bottom">
                  <span className="current-date__full">
                    12<sup>th</sup> July, 2020
                  </span>
                </div>
              </div>
            </div>
          </div>
          <figure className="quote">
            <blockquote className="quote__content">
              <p>
                I urge you to please notice when you are happy, and exclaim or
                murmur or think at some point, “If this isn’t nice, I don’t know
                what is.”
              </p>
            </blockquote>
            <figcaption className="quote__author">Kurt Vonnegut</figcaption>
          </figure>
        </div>

        <div className="app-secondary">
          <div className="weather">
            <h2 className="primary-text">Take a jacket with you, its</h2>
            <div className="weather__primary">
              <h3 className="weather__current">
                26<sup>°</sup>c
              </h3>
              <span className="weather__location">Budhanilkantha</span>
            </div>
            <div className="weather__forcast">
              <div className="weather__forcast-item">
                <h4 className="weather__forcast-title">
                  32<sup>°</sup>c
                </h4>
                <span className="weather__forcast-day">Tommorrow</span>
              </div>
              <div className="weather__forcast-item">
                <h4 className="weather__forcast-title">
                  32<sup>°</sup>c
                </h4>
                <span className="weather__forcast-day">Sunday</span>
              </div>
            </div>
          </div>

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
                  Upload design files to dropbox
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
                  Upload design files to dropbox
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
                  Upload design files to dropbox
                </label>
              </li>
            </ul>
            <footer className="todo__footer">
              <div className="todo__new">
                <input type="text" placeholder="Add New task" />
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
              </div>
            </footer>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
