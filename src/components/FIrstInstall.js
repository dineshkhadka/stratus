import React, { useState } from "react";
import { useSettings } from "../stores/useSettings";
import { useFirstInstall } from "../stores/useFirstInstall";
import "../scss/style.scss";
import * as constants from "../constants";

function FirstInstall({ closeModal }) {
  // Settings
  const settings = useSettings((state) => state.config);
  const setDateType = useSettings((state) => state.setDateType);
  const setTheme = useSettings((state) => state.setTheme);
  const toggleComponents = useSettings((state) => state.toggleComponents);
  const setHasInstalled = useFirstInstall((state) => state.setHasInstalled);

  const [preview, setPreview] = useState(0);

  const setCleanTheme = () => {
    toggleComponents((state) => ({
      ...state.components,
      weather: false,
      todo: false,
    }));
  };
  const setDefaultTheme = () => {
    toggleComponents((state) => ({
      ...state.components,
      ...constants.COMPONENTS,
    }));
  };

  return (
    <>
      <div className="settings-container">
        <div
          className="settings-container__backdrop"
          onClick={closeModal}
          aria-hidden="true"
        ></div>
        <div
          className="settings-menu settings-menu--small"
          style={{ opacity: preview ? 0 : 1 }}
        >
          <header className="settings-menu__header">
            <button
              className="btn-close btn-close--light"
              onMouseEnter={() => {
                setPreview(true);
              }}
              onMouseLeave={() => {
                setPreview(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
            <button
              className="btn-close btn-close--light"
              onClick={() => {
                setHasInstalled(true);
              }}
            >
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
          <div className="settings-menu__inner settings-menu__inner--full has-scroll">
            <div className="settings-menu__main">
              <aside className="greeting">
                <h2 className="greeting__title">
                  <span aria-label="party emoji" role="img">
                    🎉
                  </span>{" "}
                  <span className="gradient-text">
                    Thank you for installing Stratus!
                  </span>
                </h2>
                <span className="greeting__subtitle">
                  Lets get you started with some basic customizations. You can
                  change them later
                </span>
              </aside>
              <div className="settings-screen active">
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
                        defaultChecked={settings.dateType === "normal"}
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
                        defaultChecked={settings.dateType === "nepali"}
                      />
                      <label htmlFor="radio-two">Bikram Sambat</label>
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
                <div className="settings-screen__group">
                  <div className="settings-screen__label">
                    <h3 className="settings-screen__title">Layout Type</h3>
                  </div>
                  <div className="settings-screen__input">
                    <div className="switch-field switch-field--light">
                      <input
                        type="radio"
                        id="default-theme"
                        name="theme-type"
                        value="no"
                        defaultChecked="true"
                        onChange={() => {
                          setDefaultTheme();
                        }}
                      />
                      <label htmlFor="default-theme">Default</label>
                      <input
                        type="radio"
                        id="clean-theme"
                        name="theme-type"
                        value="yes"
                        onChange={() => {
                          setCleanTheme();
                        }}
                      />
                      <label htmlFor="clean-theme">Clean</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="settings-menu__footer">
            <button
              className="btn btn-primary"
              onClick={() => {
                setHasInstalled(true);
              }}
            >
              Continue with these settings
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}

export default FirstInstall;
