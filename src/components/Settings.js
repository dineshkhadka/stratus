import React, { useState } from "react";
import { SettingsContext } from "../context/settingsContext.js";
import "../scss/style.scss";
import Tab from "./Tab.js";

function SettingsModal({ closeModal }) {
  const { settings, setDateType, setTheme, toggleComponent } =
    React.useContext(SettingsContext);
  const [currentTab, setCurrentTab] = useState(1);

  const isActive = (index) => {
    return currentTab === index;
  };

  const displayTab = (index) => {
    if (!isNaN(index)) setCurrentTab(index);
  };
  return (
    <>
      <div className="settings-container">
        <div className="settings-menu">
          <header className="settings-menu__header">
            <button className="btn-icon btn-icon--light" onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </header>
          <div className="settings-menu__inner">
            <aside className="settings-menu__sidebar">
              <ul className="settings-menu__list">
                <li className="settings-menu__item">
                  <button
                    className={`settings-menu__button ${
                      isActive(1) ? "active" : ""
                    }`}
                    onClick={() => displayTab(1)}
                  >
                    Appearance
                  </button>
                </li>
                <li className="settings-menu__item">
                  <button
                    className={`settings-menu__button ${
                      isActive(2) ? "active" : ""
                    }`}
                    onClick={() => displayTab(2)}
                  >
                    Components
                  </button>
                </li>
              </ul>
            </aside>

            <div className="settings-menu__main">
              <div className={`settings-screen ${isActive(1) ? "active" : ""}`}>
                <div className="settings-screen__group">
                  <div className="settings-screen__label">
                    <h3 className="settings-screen__title">Date Type</h3>
                  </div>
                  <div className="settings-screen__input">
                    <div className="switch-field switch-field--light">
                      <input
                        type="radio"
                        id="radio-one"
                        name="switch-one"
                        value="yes"
                        onChange={() => {
                          setDateType("normal");
                        }}
                        defaultChecked={settings.date_type === "normal"}
                      />
                      <label htmlFor="radio-one">Gregorian</label>
                      <input
                        type="radio"
                        id="radio-two"
                        name="switch-one"
                        value="no"
                        onChange={() => {
                          setDateType("nepali");
                        }}
                        defaultChecked={settings.date_type === "nepali"}
                      />
                      <label htmlFor="radio-two">Nepali</label>
                    </div>
                  </div>
                </div>
                <div className="settings-screen__group">
                  <div className="settings-screen__label">
                    <h3 className="settings-screen__title">Theme</h3>
                  </div>
                  <div className="settings-screen__input">
                    <ul className="theme-switcher">
                      <li className="theme-switcher__item">
                        <div className="theme-switch theme-switch--light">
                          <input
                            type="radio"
                            id="light-theme"
                            className="theme-switch__input"
                            onChange={() => {
                              setTheme("light");
                            }}
                            defaultChecked={settings.theme === "light"}
                            name="theme-switcher"
                          />
                          <label
                            className="theme-switch__label"
                            htmlFor="light-theme"
                          >
                            <span className="sr-only">Light</span>
                          </label>
                        </div>
                      </li>

                      <li className="theme-switcher__item">
                        <div className="theme-switch theme-switch--dark">
                          <input
                            type="radio"
                            id="dark-theme"
                            className="theme-switch__input"
                            onChange={() => {
                              setTheme("dark");
                            }}
                            defaultChecked={settings.theme === "dark"}
                            name="theme-switcher"
                          />
                          <label
                            className="theme-switch__label"
                            htmlFor="dark-theme"
                          >
                            <span className="sr-only">Dark</span>
                          </label>
                        </div>
                      </li>

                      <li className="theme-switcher__item">
                        <div className="theme-switch theme-switch--auto">
                          <input
                            type="radio"
                            id="auto-theme"
                            className="theme-switch__input"
                            onChange={() => {
                              setTheme("auto");
                            }}
                            defaultChecked={settings.theme === "auto"}
                            name="theme-switcher"
                          />
                          <label
                            className="theme-switch__label"
                            htmlFor="auto-theme"
                          >
                            <span className="sr-only">System</span>
                          </label>
                        </div>
                      </li>
                      <li className="theme-switcher__item">
                        <div className="theme-switch theme-switch--background">
                          <input
                            type="radio"
                            id="background-theme"
                            className="theme-switch__input"
                            defaultChecked={settings.theme === "background"}
                            onChange={() => {
                              setTheme("background");
                            }}
                            name="theme-switcher"
                          />
                          <label
                            className="theme-switch__label"
                            htmlFor="background-theme"
                          >
                            <span className="sr-only">Image</span>
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={`settings-screen ${isActive(2) ? "active" : ""}`}>
                <div className="settings-screen__group">
                  <div className="settings-screen__label">
                    <h3 className="settings-screen__title">
                      Toggle Components
                    </h3>
                  </div>
                  <div className="settings-screen__input">
                    <div className="component-toggle">
                      <div className="component-toggle__item">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="date-toggle"
                            defaultChecked={settings.components["date"]}
                            onChange={() => toggleComponent("date")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="date-toggle"
                          >
                            Date / Time
                          </label>
                        </div>
                      </div>
                      <div className="component-toggle__item">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="weather-toggle"
                            onChange={() => toggleComponent("weather")}
                            defaultChecked={settings.components["weather"]}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="weather-toggle"
                          >
                            Weather
                          </label>
                        </div>
                      </div>
                      <div className="component-toggle__item">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="quote-toggle"
                            onChange={() => toggleComponent("quote")}
                            defaultChecked={settings.components["quote"]}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="quote-toggle"
                          >
                            Quote
                          </label>
                        </div>
                      </div>
                      <div className="component-toggle__item">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="todo-toggle"
                            onChange={() => toggleComponent("todo")}
                            defaultChecked={settings.components["todo"]}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="todo-toggle"
                          >
                            Todo List
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Settings() {
  const [diplayModal, setDisplayModal] = useState(false);
  const toggleModal = () => setDisplayModal(!diplayModal);

  const closeModal = () => setDisplayModal(false);

  return (
    <>
      <aside className="settings" role="dialog" aria-modal="true">
        <div className="settings__inner">
          <button className="settings__button btn-icon" onClick={toggleModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
            </svg>
          </button>
        </div>
      </aside>

      {diplayModal && <SettingsModal closeModal={closeModal} />}
    </>
  );
}

export default Settings;
