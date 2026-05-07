import React, { useState, useEffect } from "react";
import WeatherSearch from "./weatherSearch";
import LinksEdit from "./EditLinkCard";
import { useWorldClock } from "../stores/useWorldClock";
import { useSettings } from "../stores/useSettings";
import { TABS } from "../constants";
import { useToast } from "./Toast";
import "../scss/style.scss";
import fuzzysort from "fuzzysort";

function SettingsModal({ closeModal }) {
  // Settings
  const settings = useSettings((state) => state.config);
  const setDateType = useSettings((state) => state.setDateType);
  const setTemperatureUnit = useSettings((state) => state.setTemperatureUnit);
  const setTheme = useSettings((state) => state.setTheme);
  const toggleComponents = useSettings((state) => state.toggleComponents);
  const addBackgroundCollection = useSettings(
    (state) => state.addBackgroundCollection
  );
  const removeBackgroundCollection = useSettings(
    (state) => state.removeBackgroundCollection
  );
  const setSelectedCollection = useSettings(
    (state) => state.setSelectedCollection
  );

  // world clock
  const setWorldClock = useWorldClock((state) => state.setWorldClock);
  const worldClock = useWorldClock((state) => state.worldClock);

  const toast = useToast();

  // Local state
  const [countries, setCountries] = useState([]);
  const [currentTab, setCurrentTab] = useState(Object.keys(TABS)[0]);
  const [search, setSearch] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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
    toast.open(message);
  };
  const handleTimezone = (item) => {
    const timezoneList = worldClock || [];
    const MAX_TIMEZONES = 4;
    if (
      timezoneList.findIndex((o) => o.timezone === item.obj.timezone) !== -1
    ) {
      displayMessage("The timezone already exists in the list!");
      clearSearch();
      return false;
    }
    if (timezoneList.length >= MAX_TIMEZONES) {
      displayMessage(`A maximum of ${MAX_TIMEZONES} timezones allowed!`);
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
      setWorldClock(timezoneList);
      clearSearch();
    }
  };

  const removeTimezone = (index) => {
    const timezonesData = [...worldClock];
    timezonesData.splice(index, 1);
    setWorldClock(timezonesData);
  };

  const clearSearch = () => {
    setSearch([]);
    setSearchValue("");
  };

  const handleEscapeKey = (event) => {
    if (event.code === "Escape") {
      closeModal();
    }
  };
  useEffect(() => {
    fetch("../data/countries.json")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.log(error);
      });

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="settings-container">
        <div
          className="settings-container__backdrop"
          onClick={closeModal}
          aria-hidden="true"
        ></div>
        <div className="settings-menu" style={{ opacity: preview ? 0 : 1 }}>
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
          <div className="settings-menu__inner">
            <aside className="settings-menu__sidebar has-scroll">
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
                    Weather
                  </button>
                </li>
                <li className="settings-menu__item">
                  <button
                    className={`settings-menu__button ${
                      isActive(TABS.LINKS) ? "active" : ""
                    }`}
                    onClick={() => displayTab(TABS.LINKS)}
                  >
                    Quick Links
                  </button>
                </li>
                <li className="settings-menu__item">
                  <button
                    className={`settings-menu__button ${
                      isActive(TABS.BACKGROUND) ? "active" : ""
                    }`}
                    onClick={() => displayTab(TABS.BACKGROUND)}
                  >
                    Background
                  </button>
                </li>
                <li className="settings-menu__item">
                  <button
                    className={`settings-menu__button ${
                      isActive(TABS.ABOUT) ? "active" : ""
                    }`}
                    onClick={() => displayTab(TABS.ABOUT)}
                  >
                    About
                  </button>
                </li>
              </ul>
            </aside>

            <div className="settings-menu__main has-scroll">
              <div
                className={`settings-screen ${
                  isActive(TABS.APPEARANCE) ? "active" : ""
                }`}
              >
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
              </div>
              <div
                className={`settings-screen ${
                  isActive(TABS.BACKGROUND) ? "active" : ""
                }`}
              >
                <div className="settings-screen__group">
                  <div className="settings-screen__label">
                    <h3 className="settings-screen__title">
                      Background Collections
                    </h3>
                  </div>
                  <div className="settings-screen__input">
                    <div className="collection-manager">
                      <div className="timezone-list-wrap">
                        <h4 className="timezone-list-wrap__title">
                          Background Collections
                        </h4>
                        <ul className="timezone-list">
                          {settings.backgroundCollections.map((collection) => (
                            <li key={collection.id}>
                              <input
                                type="radio"
                                id={`collection-radio-${collection.id}`}
                                name="selected-collection"
                                checked={
                                  settings.selectedCollection === collection.id
                                }
                                onChange={() =>
                                  setSelectedCollection(collection.id)
                                }
                                className="default-check__input"
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
                                <circle cx="12" cy="12" r="10"></circle>
                                <circle cx="12" cy="12" r="5"></circle>
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
                              <label
                                htmlFor={`collection-radio-${collection.id}`}
                              >
                                <span>{collection.name}</span>
                              </label>
                              {collection.id !== "default" && (
                                <button
                                  onClick={() =>
                                    removeBackgroundCollection(collection.id)
                                  }
                                  className="btn-icon btn-icon--light"
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
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="add-collection">
                        <div className="edit-links__two-col">
                          <div className="styled-input">
                            <label
                              className="styled-input__label styled-input__label--small"
                              htmlFor="collection-name"
                            >
                              <span>Collection Name</span>
                            </label>
                            <input
                              type="text"
                              id="collection-name"
                              className="styled-input__input"
                              name="collection-name"
                              autoComplete="off"
                              placeholder="Collection Name"
                            />
                          </div>
                          <div className="styled-input">
                            <label
                              className="styled-input__label styled-input__label--small"
                              htmlFor="collection-url"
                            >
                              <span>Collection URL or ID</span>
                            </label>
                            <input
                              type="text"
                              id="collection-url"
                              className="styled-input__input"
                              name="collection-url"
                              autoComplete="off"
                              placeholder="e.g., https://unsplash.com/collections/abc123 or abc123"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const name = document
                              .getElementById("collection-name")
                              .value.trim();
                            const urlOrId = document
                              .getElementById("collection-url")
                              .value.trim();
                            if (name && urlOrId) {
                              let collectionId = null;
                              if (urlOrId.match(/^[a-zA-Z0-9_-]+$/)) {
                                // It's alphanumeric, assume it's the ID
                                collectionId = urlOrId;
                              } else if (
                                urlOrId.includes("unsplash.com/collections/")
                              ) {
                                // Extract ID from URL
                                const match = urlOrId.match(
                                  /unsplash\.com\/collections\/([a-zA-Z0-9_-]+)/
                                );
                                if (match) {
                                  collectionId = match[1];
                                }
                              }
                              if (!collectionId) {
                                displayMessage(
                                  "Invalid URL or ID. Please enter a valid Unsplash collection URL or just the alphanumeric ID."
                                );
                                return;
                              }
                              const existing =
                                settings.backgroundCollections.find(
                                  (c) => c.collectionId === collectionId
                                );
                              if (existing) {
                                displayMessage(
                                  "This collection is already added."
                                );
                                return;
                              }
                              const newCollection = {
                                id: `custom-${Date.now()}`,
                                name,
                                collectionId,
                              };
                              addBackgroundCollection(newCollection);
                              document.getElementById("collection-name").value =
                                "";
                              document.getElementById("collection-url").value =
                                "";
                              displayMessage("Collection added successfully!");
                            } else {
                              displayMessage(
                                "Please enter both name and URL/ID."
                              );
                            }
                          }}
                          className="btn btn-quick-link btn-quick-link--solid"
                        >
                          Add Collection
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`settings-screen ${
                  isActive(TABS.WIDGETS) ? "active" : ""
                }`}
              >
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
                            defaultChecked={settings.components.date}
                            onChange={(date) =>
                              toggleComponents((state) => ({
                                ...state.components,
                                date: !settings.components.date,
                              }))
                            }
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
                            defaultChecked={settings.components.weather}
                            onChange={() =>
                              toggleComponents((state) => ({
                                ...state.components,
                                weather: !settings.components.weather,
                              }))
                            }
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
                            defaultChecked={settings.components.quote}
                            onChange={(quote) =>
                              toggleComponents((state) => ({
                                ...state.components,
                                quote: !settings.components.quote,
                              }))
                            }
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
                            defaultChecked={settings.components.todo}
                            onChange={(todo) =>
                              toggleComponents((state) => ({
                                ...state.components,
                                todo: !settings.components.todo,
                              }))
                            }
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
                            defaultChecked={settings.components.timezone}
                            onChange={(timezone) =>
                              toggleComponents((state) => ({
                                ...state.components,
                                timezone: !settings.components.timezone,
                              }))
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="timezone-toggle"
                          >
                            World-clock
                          </label>
                        </div>
                      </div>
                      <div className="component-toggle__item">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="links-toggle"
                            defaultChecked={settings.components.links}
                            onChange={(links) =>
                              toggleComponents((state) => ({
                                ...state.components,
                                links: !settings.components.links,
                              }))
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="links-toggle"
                          >
                            Quick Links
                          </label>
                        </div>
                      </div>
                      <div className="component-toggle__item">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="search-toggle"
                            defaultChecked={settings.components.search}
                            onChange={() =>
                              toggleComponents((state) => ({
                                ...state.components,
                                search: !settings.components.search,
                              }))
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="search-toggle"
                          >
                            Search Bar
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`settings-screen ${
                  isActive(TABS.WORLD_CLOCK) ? "active" : ""
                }`}
              >
                <div className="settings-screen__group">
                  <div className="settings-screen__label">
                    <h3 className="settings-screen__title">Timezones</h3>
                  </div>
                  <div className="settings-screen__input">
                    <div className="timezone-wrap">
                      <div className="styled-input">
                        <input
                          type="text"
                          id="timezone"
                          className="styled-input__input"
                          name="timezone-switcher"
                          placeholder="Search a city..."
                          value={searchValue}
                          autoComplete="off"
                          onChange={(e) => searchItem(e.target.value)}
                        />
                        <label
                          className="styled-input__label"
                          htmlFor="timezone-switcher"
                        >
                          <span className="sr-only">Add new timezone</span>
                        </label>
                        <button
                          className="styled-input__reset"
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

                    {worldClock.length > 0 && (
                      <div className="timezone-list-wrap">
                        <h4 className="timezone-list-wrap__title">
                          Timezone List
                        </h4>
                        <ul className="timezone-list">
                          {worldClock.map((item, index) => {
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
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`settings-screen ${
                  isActive(TABS.WEATHER) ? "active" : ""
                }`}
              >
                <div className="settings-screen__group">
                  <div className="settings-screen__label">
                    <h3 className="settings-screen__title">Weather</h3>
                  </div>
                  <div className="settings-screen__input">
                    <WeatherSearch />
                  </div>
                </div>

                <div className="settings-screen__group">
                  <div className="settings-screen__label">
                    <h3 className="settings-screen__title">Temperature Unit</h3>
                  </div>
                  <div className="settings-screen__input">
                    <div className="switch-field switch-field--light">
                      <input
                        type="radio"
                        id="temp-celcius"
                        name="temperature-unit"
                        value="yes"
                        onChange={() => {
                          setTemperatureUnit("celcius");
                        }}
                        defaultChecked={settings.temperatureUnit === "celcius"}
                      />
                      <label htmlFor="temp-celcius">Celcius</label>
                      <input
                        type="radio"
                        id="temp-fahrenheit"
                        name="temperature-unit"
                        value="no"
                        onChange={() => {
                          setTemperatureUnit("fahrenheit");
                        }}
                        defaultChecked={
                          settings.temperatureUnit === "fahrenheit"
                        }
                      />
                      <label htmlFor="temp-fahrenheit">Fahrenheit</label>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`settings-screen ${
                  isActive(TABS.LINKS) ? "active" : ""
                }`}
              >
                <div className="settings-screen__group settings-screen__group--full-height">
                  <div className="settings-screen__label">
                    <h3 className="settings-screen__title">Quick Links</h3>
                  </div>
                  <div className="settings-screen__input">
                    <div className="quick-links-screen">
                      <LinksEdit />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`settings-screen ${
                  isActive(TABS.ABOUT) ? "active" : ""
                }`}
              >
                <div className="settings-screen__group">
                  <div className="settings-screen__content entry-content">
                    <h2>Stratus</h2>

                    <p>
                      Thank you for trying out stratus. Stratus is a free and
                      open-source extension made by Dinesh Khadka and the {""}
                      <a
                        href="https://github.com/dineshkhadka/stratus/graphs/contributors"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        contributors
                      </a>
                      .
                    </p>
                    <p>
                      If you would like to contribute to the project, suggest
                      new features or report any bugs. Please visit the
                      project's{" "}
                      <a
                        href="https://github.com/dineshkhadka/stratus"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Github
                      </a>{" "}
                      page
                    </p>
                    <h5>Links</h5>
                    <ul className="social-list">
                      <li>
                        <a
                          href="https://github.com/dineshkhadka/stratus"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Github
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://twitter.com/dineshlakai"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Twitter
                        </a>
                      </li>
                      <li>
                        <a
                          href="mailto:bytepandaweb@gmail.com"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Email
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.buymeacoffee.com/dineshlakai"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Donation
                        </a>
                      </li>
                    </ul>

                    <h5>Resources</h5>
                    <ul>
                      <li>
                        <a
                          href="https://unsplash.com/collections/26321157/stratus"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Unsplash Collection
                        </a>{" "}
                        used for Stratus
                      </li>
                      <li>
                        <a
                          href="https://www.lakai.dev/privacy"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Privacy Policy
                        </a>
                      </li>
                    </ul>
                    <br />
                    <p>
                      <small>&copy; 2022 - Licenced in GNU GPLv3</small>
                    </p>
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
          <button
            className="settings__button btn-close"
            onClick={toggleModal}
            title="Open Settings"
          >
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
