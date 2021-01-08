import React, { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import usePosition from "../hooks/usePosition";

function Weather() {
  const { latitude, longitude } = usePosition();
  return (
    <>
      <div className="weather">
        <h2 className="primary-text">Take a jacket with you, its</h2>
        <div className="weather__primary">
          <h3 className="weather__current">
            26<sup>°</sup>c
          </h3>
          <span className="weather__location">
            Budhanilkantha {latitude} - {longitude}
          </span>
        </div>
        <div className="weather__forcast">
          <div className="weather__forcast-item">
            <h4 className="weather__forcast-title">
              32<sup>°</sup>c
            </h4>
            <span className="weather__forcast-day">Tommorrow</span>
          </div>
          <div className="weather__forcast-item">
            <h4 className="weather__forcast-title">
              32<sup>°</sup>c
            </h4>
            <span className="weather__forcast-day">Sunday</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
