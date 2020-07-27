import React from "react";
import "./scss/style.scss";

function App() {
  return (
    <>
      <main className="app-container">
        <div className="app-primary">
          <div className="spotlight">
            <h2 className="primary-text">Good Day Dinesh Khadka, Today is</h2>
            <div className="spotlight__date">
              <div className="current-date">
                <div className="current-date__top">
                  <div className="current-date__primary">
                    <h1 className="current-date__day">
                      16<sup>th</sup>
                    </h1>
                    <h2 className="current-date__month">Ashoj</h2>
                  </div>
                  <div className="current-date__secondary">
                    <div className="current-date__time">
                      <span>09:53 AM</span>
                    </div>
                  </div>
                </div>

                <div className="current-date__bottom">
                  <span className="current-date__full">
                    12<sup>th</sup> July, 2020
                  </span>
                </div>
              </div>
            </div>
          </div>
          <figure className="quote">
            <blockquote className="quote__content">
              <p>
                I urge you to please notice when you are happy, and exclaim or
                murmur or think at some point, “If this isn’t nice, I don’t know
                what is.”
              </p>
            </blockquote>
            <figcaption className="quote__author">Kurt Vonnegut</figcaption>
          </figure>
        </div>

        <div className="app-secondary">
          <div className="weather">
            <h2 className="primary-text">Take a jacket with you, its</h2>
            <div className="weather__primary">
              <h3 className="weather__current">
                26<sup>°</sup>c
              </h3>
              <span className="weather__location">Budhanilkantha</span>
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
        </div>
      </main>
    </>
  );
}

export default App;
