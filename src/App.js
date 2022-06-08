import React, { useEffect } from "react";
import Weather from "./components/Weather.js";
import Todo from "./components/Todo.js";
import Spotlight from "./components/Spotlight.js";
import Credit from "./components/Credit.js";
import Quote from "./components/Quote.js";
import Image from "./components/Image.js";
import Settings from "./components/Settings.js";
import { isFreshDay } from "./utils/helpers.js";
import { SettingsContext } from "./context/settingsContext.js";
import "./scss/style.scss";

function App() {
  const { settings } = React.useContext(SettingsContext);
  useEffect(() => {
    isFreshDay();
  }, []);
  return (
    <div className="App" data-theme={settings.theme}>
      {settings.theme === "background" && <Image />}
      <main className="app-shell">
        <div className="app-primary">
          <div className={`app-primary__wrap ${!settings.components["date"] ? 'app-primary__wrap--no-spotlight': ''}`}>
            {settings.components["date"] && <Spotlight settings={settings} />}

            <footer className="footer">
              <div className="footer__inner">
              {settings.components["quote"] && <Quote /> }
              {settings.theme === "background" && <Credit /> }
              </div>
            </footer>
          </div>
        </div>
        {(settings.components["weather"] || settings.components["todo"]) && (
          <div className="app-secondary">
            <div className="app-secondary__wrap">
              {settings.components["weather"] && <Weather />}
              {settings.components["todo"] && <Todo />}
            </div>
          </div>
        )}

        <Settings />
      </main>
    </div>
  );
}

export default App;
