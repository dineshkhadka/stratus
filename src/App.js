import React, { useEffect } from "react";
import Weather from "./components/Weather";
import Todo from "./components/Todo";
import Spotlight from "./components/Spotlight";
import Credit from "./components/Credit";
import Quote from "./components/Quote";
import Image from "./components/Image";
import Settings from "./components/Settings";
import FirstInstall from "./components/FIrstInstall";
import { isFreshDay } from "./utils/helpers";
import { useSettings } from "./stores/useSettings";
import { useFirstInstall } from "./stores/useFirstInstall";
import "./scss/style.scss";

function App() {
  const settings = useSettings((state) => state.config);
  const hasInstalled = useFirstInstall((state) => state.hasInstalled);
  useEffect(() => {
    isFreshDay();
  }, []);
  return (
    <div className="App" data-theme={settings.theme}>
      {settings.theme === "background" && <Image />}
      <main className="app-shell has-scroll">
        <div className="app-primary">
          <div
            className={`app-primary__wrap ${
              !settings.components.date ? "app-primary__wrap--no-spotlight" : ""
            }`}
          >
            {settings.components.date && <Spotlight settings={settings} />}

            <footer className="footer">
              <div className="footer__inner">
                {settings.components.quote && <Quote />}
                {settings.theme === "background" && <Credit />}
              </div>
            </footer>
          </div>
        </div>
        {(settings.components.weather || settings.components.todo) && (
          <div className="app-secondary">
            <div className="app-secondary__wrap has-scroll">
              {settings.components.weather && <Weather />}
              {settings.components.todo && <Todo />}
            </div>
          </div>
        )}

        <Settings />
        {!hasInstalled && <FirstInstall />}
      </main>
    </div>
  );
}

export default App;
