const weatherCodeDescriptions = {
  0: "sunny and clear skies",
  1: "mostly sunny",
  2: "partly cloudy",
  3: "cloudy outside",
  45: "misty with fog",
  48: "misty with fog",
  51: "lightly drizzling",
  53: "moderate rain",
  55: "drizzling heavily",
  56: "light freezing drizzle",
  57: "dense freezing drizzle",
  61: "lightly raining in showers",
  63: "moderate rain showers",
  65: "raining heavily in showers",
  66: "lightly freezing rain",
  67: "heavy freezing rain",
  71: "lightly snowing in showers",
  73: "moderate snow showers",
  75: "snowing heavily in showers",
  77: "snowing in grains",
  80: "light rain showers",
  81: "moderate rain showers",
  82: "raining heavily in showers",
  85: "light snow showers",
  86: "snowing heavily in showers",
  95: "thunderstormin' time",
  96: "thunderstorming with slight hail",
  99: "thunderstorming with heavy hail",
};

export default function getDescriptionForWeatherCode(code) {
  return weatherCodeDescriptions[code]
    ? `It\'s ${weatherCodeDescriptions[code]} today!`
    : "The weather today is";
}
