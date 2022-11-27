let URL = "https://stratus-server.vercel.app";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // URL = 'http://localhost:5000'
}
export default {
  BACKGROUND_API: `${URL}/api/background`,
  WEATHER_API: `${URL}/api/weather`,
  REVERSE_LOCATION_API: `${URL}/api/reverse`,
  GEOLOCATION_API: `${URL}/api/geo`,
  QUOTES_API: `${URL}/api/quote`,
};
