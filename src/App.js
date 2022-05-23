import React, { useEffect  } from "react";
import Weather from "./components/Weather.js";
import Quote from "./components/Quote.js";
import Todo from "./components/Todo.js";
import Spotlight from "./components/Spotlight.js";
import Footer from "./components/Footer.js";
import Image from "./components/Image.js";
import { isFreshDay } from "./utils/helpers.js";
import "./scss/style.scss";



function App() {
  useEffect(() => {
    isFreshDay();
  }, []);
  return (
    <div className="App" data-theme="background">
    <Image />
      <main className="app-shell">
        <div className="app-primary">
          <div className="app-primary__wrap">
            <Spotlight />
            <Quote />
            <Footer />
          </div>
        </div>
        <div className="app-secondary">
          <div className="app-secondary__wrap">
            <Weather />
            <Todo />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
