import React, { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getUID, getDayFromEpoch } from "../utils/helpers.js";
import wretch from "wretch";

const API_KEY = "c1b928b71dc25eee21fde1cead132ae8";
function Weather() {
  const [weatherDetails, setWeatherDetails] = useLocalStorage(
    "stratus-weather",
    []
  );
  const [placeName, setPlaceName] = useLocalStorage("stratus-place", []);
  const [geoLocation, setGeoLocation] = useLocalStorage("stratus-location", []);

  const fetchLocation = () => {
    console.log("Failed to get Geolocation, attempting to fetch from api...");
    const location = `https://api.openweathermap.org/geo/1.0/direct?q=kathmandu&appid=${API_KEY}`;
    wretch(location)
      .get()
      .json((json) => {
        console.log(json[0])
        fetchWeatherData({ lat: json[0].lat, long: json[0].lon });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchWeatherData = (args) => {
    var {lat, long} = args;
    const location = `https://api.openweathermap.org/geo/1.0/reverse?$&lat=${lat}&lon=${long}&appid=${API_KEY}`;
    const current_api = `https://api.openweathermap.org/data/2.5/onecall?&lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`;

    wretch(current_api)
      .get()
      .json((json) => {
        setWeatherDetails(
          {
            data: json,
            lastUpdated: getUID()
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });

    wretch(location)
      .get()
      .json((json) => {
        console.log(json[0]);
        setPlaceName({
          name: json[0].name,
          lastUpdated: getUID(),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
      fetchLocation()
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
    if (
      weatherDetails.lastUpdated == null ||
      weatherDetails.lastUpdated !== getUID()
    ) {
      updateWeather();
    }
    return () => {};
  }, []);
  return (
    <>
      {Object.keys(weatherDetails).length > 0 && (
        <div className="weather">
          <h2 className="primary-text">Today the weather is</h2>
          <div className="weather__primary">
            <h3 className="weather__current">
              {Math.round(parseInt(weatherDetails.data.current.temp))}
              <sup>°</sup>c
            </h3>
            <span className="weather__location">{placeName.name}</span>
          </div>
          <div className="weather__forcast">
            <div className="weather__forcast-item">
              <h4 className="weather__forcast-title">
                {Math.round(parseInt(weatherDetails.data.daily[1].temp.day))}
                <sup>°</sup>c
              </h4>
              <span className="weather__forcast-day">Tommorrow</span>
            </div>
            <div className="weather__forcast-item">
              <h4 className="weather__forcast-title">
                {Math.round(parseInt(weatherDetails.data.daily[2].temp.day))}
                <sup>°</sup>c
              </h4>
              <span className="weather__forcast-day">
                {getDayFromEpoch(weatherDetails.data.daily[2].dt)}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Weather;
