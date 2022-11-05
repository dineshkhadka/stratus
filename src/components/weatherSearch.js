import React, { useState, useEffect } from "react";
import { getUID } from "../utils/helpers.js";
import { useStore } from '../stores/useStore'
import {
  getLocation,
  getPlaceNamefromCoordinates,
  getNativeLocation,
  getWeatherData,
} from "../utils/getCurrentCoordinates";

export default function WeatherSearch() {

  const weatherDetails = useStore((state) => state.weatherDetails);
  const setWeatherDetails = useStore((state) => state.setWeatherDetails);


  const setPlaceName = useStore((state) => state.setPlaceName)
  
  
  const [city, setCity] = useState();

  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    if (
      weatherDetails.lastUpdated == null ||
      weatherDetails.lastUpdated !== getUID()
    ) {
      updateWeather();
    }
    return () => {};
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const updateWeather = () => {
    if (weatherDetails.lat && weatherDetails.long) {
      fetchWeatherData({
        lat: weatherDetails.lat,
        long: weatherDetails.long,
      });
    }
  };
  const fetchWeatherData = async (args) => {
    var { lat, long } = args;
    const weatherData = getWeatherData(args);
    weatherData
      .then((data) => {
        console.log(data);
        setWeatherDetails({
          data: data,
          lat,
          long,
          lastUpdated: getUID(),
        });
      })
      .catch((error) => {
        console.log(error);
      });

    const placeNamefromCoordinates = getPlaceNamefromCoordinates(args);
    placeNamefromCoordinates
      .then((data) => {
        console.log(data);
        setPlaceName({
          name: data.name,
          lastUpdated: getUID(),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchLocation = async () => {
    const location = getLocation(city);
    location
      .then((data) => {
        console.log(data);
        fetchWeatherData({ lat: data.lat, long: data.lon });
      })
      .catch((error) => {
        console.log(error);
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
    setErrorMessage(false);
  };

  const detectWeather = (e) => {
    const nativeLocation = getNativeLocation();
    e.preventDefault();
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
      });
  };
  return (
    <>
      <div className="weather">
        <form onSubmit={handleWeatherSubmit}>
          <input
            type="text"
            onChange={(e) => handlePlaceInput(e, e.target.value)}
          />
          <button className="">Search</button>
          <button className="" type="button" onClick={detectWeather}>
            Detect
          </button>
        </form>
        {errorMessage && <div className="message">Location not found!</div>}
      </div>
    </>
  );
}
