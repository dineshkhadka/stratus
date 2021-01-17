import React, { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getUID, getDayFromEpoch } from "../utils/helpers.js";
import wretch from "wretch";

const fetchLocation = () => {
  wretch("https://geolocation-db.com/json/")
    .get()
    .json((json) => {
      console.log(json);
    })
    .catch((error) => {
      console.log(error);
    });
};

const API_KEY = "c1b928b71dc25eee21fde1cead132ae8";
function Weather() {
  const [weatherDetails, setWeatherDetails] = useLocalStorage(
    "stratus-weather",
    []
  );
  const [placeName, setPlaceName] = useLocalStorage("stratus-place", []);
  const [geoLocation, setGeoLocation] = useLocalStorage("stratus-location", []);

  const fetchWeatherData = (lat, long) => {
    const location = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=${API_KEY}`;
    const current_api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`;

    wretch(current_api)
      .get()
      .json((json) => {
        setWeatherDetails(json);
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
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const handleLocation = async (location) => {
      try {
        setGeoLocation({
          lat: location.coords.latitude,
          long: location.coords.longitude,
          lastUpdated: getUID(),
        });
        fetchWeatherData(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        console.error(error);
      }
    };
    const handleError = () => {
      fetchLocation();
    };

    const updateWeather = () => {
      navigator.geolocation.getCurrentPosition(
        handleLocation,
        handleError,
        options
      );
    };
    if (
      geoLocation.lastUpdated == null ||
      geoLocation.lastUpdated !== getUID()
    ) {
      console.log("it was a new day: " + getUID());
      updateWeather();
    } else {
      console.log("it was a an old day" + getUID());
    }
    console.log(weatherDetails);
    return () => {};
  }, []);
  return (
    <>
      {Object.keys(weatherDetails).length > 0 && (
        <div className="weather">
          <h2 className="primary-text">Today the weather is</h2>
          <div className="weather__primary">
            <h3 className="weather__current">
              {weatherDetails.current.temp}
              <sup>°</sup>c
            </h3>
            <span className="weather__location">{placeName.name}</span>
          </div>
          <div className="weather__forcast">
            <div className="weather__forcast-item">
              <h4 className="weather__forcast-title">
                {weatherDetails.daily[1].temp.day}
                <sup>°</sup>c
              </h4>
              <span className="weather__forcast-day">Tommorrow</span>
            </div>
            <div className="weather__forcast-item">
              <h4 className="weather__forcast-title">
                {weatherDetails.daily[2].temp.day}
                <sup>°</sup>c
              </h4>
              <span className="weather__forcast-day">
                {getDayFromEpoch(weatherDetails.daily[2].dt)}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Weather;
