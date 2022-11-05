import React, { useState, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { SettingsContext } from "../context/settingsContext.js";
import WeatherSearch from "./weatherSearch";
import "../scss/style.scss";

const fuzzysort = require("fuzzysort");

const TABS = {
  APPEARANCE: "APPEARANCE",
  WIDGETS: "WIDGETS",
  WORLD_CLOCK: "WORLD_CLOCK",
  WEATHER: "WEATHER",
};

function SettingsModal({ closeModal }) {
  const { settings, setDateType, setTheme, toggleComponent, setTimezone } =
    useContext(SettingsContext);
  const [placeName, setPlaceName] = useLocalStorage("stratus-place", []);
  const [, setGeoLocation] = useLocalStorage("stratus-location", []);
  const [countries, setCountries] = useState([]);
  const [currentTab, setCurrentTab] = useState(Object.keys(TABS)[0]);
  const [search, setSearch] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [placeValue, setPlaceValue] = useState(placeName?.name);
  const [errorMessage, setErrorMessage] = useState({
    displayed: false,
    message: "",
    type: "alert",
  });

  const [preview, setPreview] = useState(0);

  const isActive = (index) => {
    return currentTab === index;
  };

  const displayTab = (index) => {
    if (index) setCurrentTab(index);
  };
  const searchItem = (query) => {
    if (!query) {
      clearSearch();
      return;
    }
    setSearchValue(query);
    const result = fuzzysort.go(searchValue, countries, {
      keys: ["name", "timezone"],
    });
    if (result.length) {
      setSearch(result);
    } else {
      setSearch([]);
    }
  };
  const displayMessage = (message) => {
    setErrorMessage({ ...errorMessage, displayed: true, message: message });
    var timer = null;
    if (timer) {
      clearTimeout(timer); //cancel the previous timer.
      timer = null;
    }
    timer = setTimeout(() => {
      setErrorMessage({ ...errorMessage, displayed: false, message: message });
    }, 3000);
  };
  const handleTimezone = (item) => {
    const timezoneList = settings.time_zones || [];
    if (
      timezoneList.findIndex((o) => o.timezone === item.obj.timezone) !== -1
    ) {
      displayMessage("The timezone already exists in the list!");
      clearSearch();
      return false;
    }
    if (timezoneList.length > 3) {
      displayMessage("A maximum of 4 timezones allowed!");
      clearSearch();
    } else {
      timezoneList.push({
        timezone: item.obj.timezone,
        location: item.obj.timezone
          .split("/")
          .slice(-1)[0]
          .split("_")
          .join(" "),
        city: item.obj.name.split("_").join(" ").replace("\\\\", ""),
      });
      setTimezone(timezoneList);
      clearSearch();
    }
  };

  const removeTimezone = (index) => {
    const timezonesData = [...settings.time_zones];
    timezonesData.splice(index, 1);
    setTimezone(timezonesData);
  };

  const clearSearch = () => {
    setSearch([]);
    setSearchValue("");
  };
  const handleLocationSubmit = () => {
    // fetchLocation(placeValue)
  }
  useEffect(() => {
    fetch("../data/countries.json")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {};
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="settings-container" style={{ opacity: preview ? 0 : 1 }}>
        <div className="settings-menu">
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
            <button className="btn-close btn-close--light" onClick={closeModal}>
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
          <div className="settings-menu__inner has-scroll">
            <aside className="settings-menu__sidebar">
              <ul className="settings-menu__list">
                <li className="settings-menu__item">
                  <button
                    className={`settings-menu__button ${
                      isActive(TABS.APPEARANCE) ? "active" : ""
                    }`}
                    onClick={() => displayTab(TABS.APPEARANCE)}
                  >
                    Appearance
                  </button>
                </li>
                <li className="settings-menu__item">
                  <button
                    className={`settings-menu__button ${
                      isActive(TABS.WIDGETS) ? "active" : ""
                    }`}
                    onClick={() => displayTab(TABS.WIDGETS)}
                  >
                    Widgets
                  </button>
                </li>
                <li className="settings-menu__item">
                  <button
                    className={`settings-menu__button ${
                      isActive(TABS.WORLD_CLOCK) ? "active" : ""
                    }`}
                    onClick={() => displayTab(TABS.WORLD_CLOCK)}
                  >
                    World Clock
                  </button>
                </li>
                <li className="settings-menu__item">
                  <button
                    className={`settings-menu__button ${
                      isActive(TABS.WEATHER) ? "active" : ""
                    }`}
                    onClick={() => displayTab(TABS.WEATHER)}
                  >
                    Location
                  </button>
                </li>
              </ul>
            </aside>

            <div className="settings-menu__main">
              <aside
                className={`error-message ${errorMessage.displayed && "shown"}`}
              >
                <span>{errorMessage.message}</span>
              </aside>
              <div className={`settings-screen ${isActive(TABS.APPEARANCE) && "active"}`}>
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
              <div className={`settings-screen ${isActive(TABS.WIDGETS) && "active"}`}>
                <div className="settings-screen__group">
                  <div className="settings-screen__label">
                    <h3 className="settings-screen__title">Toggle Widgets</h3>
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
                      <div className="component-toggle__item">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="timezone-toggle"
                            onChange={() => toggleComponent("timezone")}
                            defaultChecked={settings.components["timezone"]}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="timezone-toggle"
                          >
                            World-clock
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`settings-screen ${isActive(TABS.WORLD_CLOCK) && "active"}`}>
                <div className="settings-screen__group">
                  <div className="settings-screen__label">
                    <h3 className="settings-screen__title">Timezones</h3>
                  </div>
                  <div className="settings-screen__input">
                    <div className="timezone-wrap">
                      <div className="timezone-input">
                        <input
                          type="text"
                          id="timezone"
                          className="timezone-input__input"
                          name="timezone-switcher"
                          placeholder="Search a city..."
                          value={searchValue}
                          onChange={(e) => searchItem(e.target.value)}
                        />
                        <label
                          className="timezone-input__label"
                          htmlFor="timezone"
                        >
                          <span className="sr-only">Add new timezone</span>
                        </label>
                        <button
                          className="timezone-input__reset"
                          onClick={clearSearch}
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
                      </div>
                      <ul className="timezone-results has-scroll">
                        {search.map((item, index) => {
                          return (
                            <li
                              key={index}
                              onClick={() => handleTimezone(item)}
                            >
                              {item.obj.timezone} - ({item.obj.name})
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    {settings.time_zones && (
                      <ul className="timezone-list has-scroll">
                        {settings.time_zones.map((item, index) => {
                          return (
                            <li key={index}>
                              {item.timezone} -{" "}
                              {item.city.length > 0 && item.city}
                              <button
                                className="btn-icon"
                                onClick={() => removeTimezone(index)}
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
                                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <div className={`settings-screen ${isActive(TABS.WEATHER) && "active"}`}>
                <div className="settings-screen__group">
                  <div className="settings-screen__label">
                    <h3 className="settings-screen__title">Weather</h3>
                  </div>
                  <div className="settings-screen__input">
                      <WeatherSearch />
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
          <button className="settings__button btn-close" onClick={toggleModal}>
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
