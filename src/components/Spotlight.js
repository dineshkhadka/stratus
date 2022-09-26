import React, { useState, useEffect } from "react";
import NepaliDate from "../libs/NepaliDate";
import {
  getFullDate,
  getCurrentMonth,
  getCurrentDate,
} from "../utils/getCurrentdate";
import calendar from "../utils/getNepaliName";
import suffix from "../utils/getSuffix";

const getTZTime = (tz) => {
  return new Date(Date.now()).toLocaleTimeString("en-US", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
  });
};
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
                <div>
                  {time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                {props.settings.date_type === "nepali" && (
                  <div className="current-date__full">{getFullDate()}</div>
                )}
              </div>
            </div>
          </div>
          {props.settings.time_zones && props.settings.components["timezone"] && (
            <div className="current-date__bottom">
              <div className="current-date__intl">
                {props.settings.time_zones.map((item, index) => {
                  return (
                    <div className="world-clock" key={index}>
                      <h3 className="world-clock__location">{item.location}</h3>
                      <div className="world-clock__time">
                        <span>{getTZTime(item.timezone)}</span>
                      </div>
                      <div className="world-clock__date">
                        {new Date(Date.now()).toLocaleDateString("en-US", {
                          timeZone: item.timezone,
                          day: "numeric",
                          month: "numeric",
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Spotlight;
