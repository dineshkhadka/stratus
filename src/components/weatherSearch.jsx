import React, { useState } from "react";
import { getUID } from "../utils/helpers.js";
import { useStore } from "../stores/useStore";
import {
  getLocation,
  getPlaceNamefromCoordinates,
  getNativeLocation,
  getWeatherData,
} from "../utils/getCurrentCoordinates";

export default function WeatherSearch() {
  const setWeatherDetails = useStore((state) => state.setWeatherDetails);

  const placeName = useStore((state) => state.placeName);
  const setPlaceName = useStore((state) => state.setPlaceName);
  const [city, setCity] = useState();
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState({
    display: false,
    message: "",
  });
  const fetchWeatherData = async (args) => {
    setLoading(true);
    var { lat, long } = args;
    const weatherData = getWeatherData(args);
    weatherData
      .then((data) => {
        setWeatherDetails({
          data: data,
          lat,
          long,
          lastUpdated: getUID(),
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        displayMessage("Failed to get data!");
        setLoading(false);
      });

    const placeNamefromCoordinates = getPlaceNamefromCoordinates(args);
    placeNamefromCoordinates
      .then((data) => {
        setPlaceName({
          name: data.name,
          lastUpdated: getUID(),
        });
      })
      .catch((error) => {
        console.log(error);
        displayMessage("Failed to get data!");
      });
  };
  const fetchLocation = async () => {
    const location = getLocation(city);
    location
      .then((data) => {
        if (data.status !== "error") {
          fetchWeatherData({ lat: data.lat, long: data.lon });
        } else {
          displayMessage("Failed to get data!");
        }
      })
      .catch((error) => {
        console.log(error);
        displayMessage("Failed to get data!");
      });
  };
  const handleWeatherSubmit = (e) => {
    e.preventDefault();
    if (!city) return false;
    fetchLocation(city);
  };

  const handlePlaceInput = (e, value) => {
    e.preventDefault();
    setCity(value);
    setErrorMessage({ ...errorMessage, displayed: false });
  };

  const detectWeather = (e) => {
    const nativeLocation = getNativeLocation();
    nativeLocation
      .then((location) => {
        if (location) {
          fetchWeatherData({
            lat: location.coords.latitude,
            long: location.coords.longitude,
          });
        }
      })
      .catch((err) => {
        console.error(err.message);
        displayMessage("Failed to get data!");
      });
  };
  const displayMessage = (message) => {
    setLoading(false);
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
  return (
    <>
      <div className="weather-search">
        <form onSubmit={handleWeatherSubmit} className="styled-input">
          <input
            type="text"
            className="styled-input__input styled-input__input--front"
            name="weather-search"
            placeholder={
              !!placeName.name && placeName.name.length > 0
                ? placeName.name
                : "Search a city..."
            }
            autoComplete="off"
            onChange={(e) => handlePlaceInput(e, e.target.value)}
          />
          <label className="styled-input__label" htmlFor="weather-search">
            <span className="sr-only">Search a city...</span>
          </label>

          <button
            title="Search"
            className="styled-input__reset styled-input__reset--front"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <button
            title="Autodetect Location"
            className="styled-input__reset styled-input__reset--alt"
            type="button"
            onClick={detectWeather}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </button>
        </form>
        {errorMessage.displayed && (
          <div className="location-message">{errorMessage.message}</div>
        )}
        {loading && (
          <div className="location-message">Fetching weather data...</div>
        )}
      </div>
    </>
  );
}
