import React, { useState, useEffect } from "react";
import NepaliDate from "../libs/NepaliDate";
import {
  getFullDate,
  getCurrentMonth,
  getCurrentDate,
} from "../utils/getCurrentdate";
import calendar from "../utils/getNepaliName";
import suffix from "../utils/getSuffix";
function Spotlight(props) {
  const [time, setTime] = useState(new Date());
  const [nepaliDate] = useState(NepaliDate.today());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 100);
    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <div className="spotlight">
      <h2 className="primary-text">
        Good{" "}
        {time.getHours() < 12 ? "Morning" : time < 18 ? "afternoon" : "evening"}
        , today is
      </h2>
      <div className="spotlight__date">
        <div className="current-date">
          <div className="current-date__top">
            <div className="current-date__primary">
              {props.settings.date_type === "normal" && (
                <>
                  <h1 className="current-date__day">
                    {getCurrentDate()}
                    <sup>{suffix(getCurrentDate())}</sup>
                  </h1>

                  <h2 className="current-date__month">{getCurrentMonth()}</h2>
                </>
              )}
              {props.settings.date_type === "nepali" && (
                <>
                  <h1 className="current-date__day">
                    {nepaliDate.nepaliDay}
                    <sup>{suffix(nepaliDate.nepaliDay)}</sup>
                  </h1>

                  <h2 className="current-date__month">
                    {calendar.month.en.long[nepaliDate.nepaliMonth - 1]}
                  </h2>
                </>
              )}
            </div>
            <div className="current-date__secondary">
              <div className="current-date__time">
                <span>{time.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
          {props.settings.date_type === "nepali" && (
            <div className="current-date__bottom">
              <span className="current-date__full">{getFullDate()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Spotlight;
