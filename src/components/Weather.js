import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getUID, getDayFromEpoch } from "../utils/helpers.js";
import { boundStore } from '../stores/useBoundStore'
import {
  getPlaceNamefromCoordinates,
  getWeatherData,
} from "../utils/getCurrentCoordinates";
import WeatherSearch from "./weatherSearch";
function Weather() {
  // const [weatherDetails, setWeatherDetails] = useLocalStorage(
  //   "stratus-weather",
  //   []
  // );

  const weatherDetails = boundStore((state) => state.weatherDetails)
  const setWeatherDetails = boundStore((state) => state.setWeatherDetails)


  const placeName = boundStore((state) => state.placeName)
  const setPlaceName = boundStore((state) => state.setPlaceName)

  
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
    console.log(weatherDetails.data)
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
  return (
    <>
      {Object.keys(weatherDetails).length > 0 && (
        <div className="weather">
          <h2 className="primary-text">The weather today is</h2>
          <div className="weather__primary">
            <h3 className="weather__current">
              {Math.round(
                parseInt(weatherDetails.data.current_weather.temperature)
              )}
              <sup>°</sup>c
            </h3>
            <span className="weather__location">{placeName.name}</span>
          </div>
          <div className="weather__forcast">
            <div className="weather__forcast-item">
              <h4 className="weather__forcast-title">
                {Math.round(
                  parseInt(weatherDetails.data.days.temperature_2m_max[1])
                )}
                <sup>°</sup>c
              </h4>
              <span className="weather__forcast-day">Tommorrow</span>
            </div>
            <div className="weather__forcast-item">
              <h4 className="weather__forcast-title">
                {Math.round(
                  parseInt(weatherDetails.data.days.temperature_2m_max[2])
                )}
                <sup>°</sup>c
              </h4>
              <span className="weather__forcast-day">
                {getDayFromEpoch(weatherDetails.data.days.time[2])}
              </span>
            </div>
          </div>
        </div>
      )}
      {weatherDetails.length === 0 && (
        <WeatherSearch />
      )}
    </>
  );
}

export default Weather;
