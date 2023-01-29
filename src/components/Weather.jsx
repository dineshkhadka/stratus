import React, { useEffect } from "react";
import { getUID, getDayFromEpoch } from "../utils/helpers.js";
import getDescriptionForWeatherCode from "../utils/weatherCode.js";
import { getCurrentHour } from "../utils/getCurrentdate.js";
import { useStore } from "../stores/useStore";
import { useSettings } from "../stores/useSettings";
import {
  getPlaceNamefromCoordinates,
  getWeatherData,
} from "../utils/getCurrentCoordinates";
import WeatherSearch from "./weatherSearch";
function Weather() {
  const weatherDetails = useStore((state) => state.weatherDetails);
  const setWeatherDetails = useStore((state) => state.setWeatherDetails);

  const placeName = useStore((state) => state.placeName);
  const setPlaceName = useStore((state) => state.setPlaceName);

  const settings = useSettings((state) => state.config);

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

  const getTemperatureUnit = () => {
    return settings.temperatureUnit === "celcius" ? "C" : "F";
  };
  const allWeatherData = () => {
    let weather_all = [
      weatherDetails.data.hourly?.temperature_2m[getCurrentHour()] ??
        weatherDetails.data.current_weather.temperature,
      weatherDetails.data.days.temperature_2m_max[1],
      weatherDetails.data.days.temperature_2m_max[2],
    ];
    if (settings.temperatureUnit !== "celcius") {
      return weather_all.map((temp) => (temp * 9) / 5 + 32);
    } else {
      return weather_all;
    }
  };
  const fetchWeatherData = async (args) => {
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
      })
      .catch((error) => {
        console.log(error);
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
      });
  };
  return (
    <>
      {Object.keys(weatherDetails).length > 0 && (
        <div className="weather">
          <h2 className="primary-text">
            {getDescriptionForWeatherCode(
              weatherDetails.data.current_weather.weathercode
            )}
          </h2>
          <div className="weather__primary">
            <h3 className="weather__current">
              {Math.round(allWeatherData()[0])}
              <sup>
                °
                <span className="weather__current-temp">
                  {getTemperatureUnit()}
                </span>
              </sup>
            </h3>
            <span className="weather__location">{placeName.name}</span>
          </div>
          <div className="weather__forcast">
            <div className="weather__forcast-item">
              <span className="weather__forcast-day">Tommorrow</span>
              <h4 className="weather__forcast-title">
                {Math.round(allWeatherData()[1])}
                <sup>
                  °
                  <span className="weather__forcast-temp">
                    {getTemperatureUnit()}
                  </span>
                </sup>
              </h4>
            </div>
            <div className="weather__forcast-item">
              <span className="weather__forcast-day">
                {getDayFromEpoch(weatherDetails.data.days.time[2])}
              </span>
              <h4 className="weather__forcast-title">
                {Math.round(allWeatherData()[2])}
                <sup>
                  °
                  <span className="weather__forcast-temp">
                    {getTemperatureUnit()}
                  </span>
                </sup>
              </h4>
            </div>
          </div>
        </div>
      )}
      {weatherDetails.length === 0 && <WeatherSearch />}
    </>
  );
}

export default Weather;
