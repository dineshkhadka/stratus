import React from "react";
import Weather from "./components/Weather.js";
import Todo from "./components/Todo.js";
import Spotlight from "./components/Spotlight.js";
import Quote from "./components/Quote.js";
import "./scss/style.scss";

function App() {
  return (
    <>
      <main className="app-shell">
        <div className="app-primary">
          <div className="app-primary__wrap">
            <Spotlight />
            <Quote />
          </div>
        </div>
        <div className="app-secondary">
          <div className="app-secondary__wrap">
            <Weather />
            <Todo />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
