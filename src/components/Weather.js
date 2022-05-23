import React, { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getUID, getDayFromEpoch } from "../utils/helpers.js";
import wretch from "wretch";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_URL = 'https://stratus-server.onrender.com';
function Weather() {
  const [weatherDetails, setWeatherDetails] = useLocalStorage(
    "stratus-weather",
    []
  );
  const [placeName, setPlaceName] = useLocalStorage("stratus-place", []);
  const [, setGeoLocation] = useLocalStorage("stratus-location", []);

  useEffect(() => {
    const options = {
      enableHighAccuracy: false,
      timeout: 6000,
      maximumAge: 0,
    };
    const handleLocation = async (location) => {
      try {
        setGeoLocation({
          lat: location.coords.latitude,
          long: location.coords.longitude,
          lastUpdated: getUID(),
        });
        fetchWeatherData({
          lat: location.coords.latitude,
          long: location.coords.longitude,
        });
      } catch (error) {
        console.error(error);
      }
    };
    const handleError = (err) => {
      fetchLocation();
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    const updateWeather = () => {
      console.log("Attempting to fetch location...");
      navigator.geolocation.getCurrentPosition(
        handleLocation,
        handleError,
        options
      );
    };

    const fetchWeatherData = async (args) => {
      var { lat, long } = args;
      const location = `https://api.openweathermap.org/geo/1.0/reverse?$&lat=${lat}&lon=${long}&appid=${API_KEY}`;
      const current_api = `${API_URL}/api/weather?lat=${lat}&long=${long}`;

      wretch(current_api)
        .get()
        .json((json) => {
          setWeatherDetails({
            data: json,
            lastUpdated: getUID(),
          });
        })
        .catch((error) => {
          console.log(error);
        });

      wretch(location)
        .get()
        .json((json) => {
          setPlaceName({
            name: json[0].name,
            lastUpdated: getUID(),
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const fetchLocation = async () => {
      console.log("Failed to get Geolocation, attempting to fetch from api...");
      const location = `https://geocoding-api.open-meteo.com/v1/search?name=kathmandu`;
      wretch(location)
        .get()
        .json((json) => {
          fetchWeatherData({ lat:json.results[0].latitude, long:  json.results[0].longitude });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (API_KEY !== undefined) {
      if (
        weatherDetails.lastUpdated == null ||
        weatherDetails.lastUpdated !== getUID()
      ) {
        updateWeather();
      }
    }
    return () => {};
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {Object.keys(weatherDetails).length > 0 && (
        <div className="weather">
          <h2 className="primary-text">The weather today is</h2>
          <div className="weather__primary">
            <h3 className="weather__current">
              {Math.round(parseInt(weatherDetails.data.current_weather.temperature))}
              <sup>°</sup>c
            </h3>
            <span className="weather__location">{placeName.name}</span>
          </div>
          <div className="weather__forcast">
            <div className="weather__forcast-item">
              <h4 className="weather__forcast-title">
                {Math.round(parseInt(weatherDetails.data.days.temperature_2m_max[1]))}
                <sup>°</sup>c
              </h4>
              <span className="weather__forcast-day">Tommorrow</span>
            </div>
            <div className="weather__forcast-item">
              <h4 className="weather__forcast-title">
                {Math.round(parseInt(weatherDetails.data.days.temperature_2m_max[2]))}
                <sup>°</sup>c
              </h4>
              <span className="weather__forcast-day">
                {getDayFromEpoch(weatherDetails.data.days.time[2])}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Weather;
