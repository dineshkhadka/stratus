import React, { useState, useEffect } from "react";
import calendarFunctions from "../libs/NepaliDate";
import {
  getFullDate,
  getCurrentMonth,
  getCurrentDate,
} from "../utils/getCurrentdate";
import calendar from "../utils/getNepaliName";
import suffix from "../utils/getSuffix";
import { useWorldClock } from "../stores/useWorldClock";
import { useSettings } from "../stores/useSettings";

const getTZTime = (tz) => {
  return new Date(Date.now()).toLocaleTimeString("en-US", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
  });
};
function Spotlight(props) {
  const [time, setTime] = useState(new Date());
  const [nepaliDate] = useState(calendarFunctions.today());
  const worldClock = useWorldClock((state) => state.worldClock);

  const settings = useSettings((state) => state.config);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <div className="spotlight">
      <div className="spotlight__inner">
        <h2 className="primary-text">
          Good{" "}
          {time.getHours() < 12
            ? "morning"
            : time.getHours() < 18
            ? "afternoon"
            : "evening"}
          , today is
        </h2>
        <div className="spotlight__date">
          <div className="current-date">
            <div className="current-date__top">
              <div className="current-date__primary">
                {settings.dateType === "normal" && (
                  <>
                    <h1 className="current-date__day">
                      {getCurrentDate()}
                      <sup>{suffix(getCurrentDate())}</sup>
                    </h1>

                    <h2 className="current-date__month">{getCurrentMonth()}</h2>
                  </>
                )}
                {settings.dateType === "nepali" && (
                  <>
                    <h1 className="current-date__day">
                      {nepaliDate.bsDate}
                      <sup>{suffix(nepaliDate.bsDate)}</sup>
                    </h1>

                    <h2 className="current-date__month">
                      {calendar.month.en.long[nepaliDate.bsMonth - 1]}
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
                  <div className="current-date__full">
                    {getFullDate().day}
                    {settings.dateType === "nepali" && (
                      <>
                        , {getFullDate().date}
                        <sup>{getFullDate().dateSuffix}</sup> of{" "}
                        {getFullDate().month}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {!!worldClock && settings.components["timezone"] && (
              <div className="current-date__bottom">
                <div className="current-date__intl">
                  {worldClock.map((item, index) => {
                    return (
                      <div className="world-clock" key={index}>
                        <h3 className="world-clock__location">
                          {item.location}
                        </h3>
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
    </div>
  );
}

export default Spotlight;
