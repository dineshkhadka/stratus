import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const intialSettings = {
  date_type: "nepali",
  theme: "dark",
  setTheme: () => {},
  setDateType: () => {},
  components: {
    'date' : true,
    'time': true,
    'quote' : true,
    'weather' : true,
    'weather_future' : true,
    'todo' : true,
    'credit' : true
  }
};

const SettingsContext = React.createContext(intialSettings);

function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage("stratus-settings", intialSettings);
  const setTheme = (themeType) => {
    const newSettings = { ...settings };
    newSettings.theme = themeType;
    setSettings(newSettings);
  };
  const setDateType = (dateType) => {
    const newSettings = { ...settings };
    newSettings.date_type = dateType;
    setSettings(newSettings);
  };

  const toggleComponent = (component) => {
    const newSettings = { ...settings };
    newSettings.components[component] = !newSettings.components[component];
    setSettings(newSettings);
  };
  return (
    <SettingsContext.Provider value={{ settings, setTheme, setDateType, toggleComponent }}>
      {children}
    </SettingsContext.Provider>
  );
}
export { SettingsProvider, SettingsContext };
