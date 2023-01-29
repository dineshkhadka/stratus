import api from "../utils/api";

export async function getLocation(city) {
  const res = await fetch(`${api.GEOLOCATION_API}?place=${city}`);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const data = await res.json();
  return data;
}
export async function getPlaceNamefromCoordinates(args) {
  var { lat, long } = args;
  const res = await fetch(
    `${api.REVERSE_LOCATION_API}?$&lat=${lat}&long=${long}`
  );

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const data = await res.json();
  return data;
}

export async function getWeatherData(args) {
  var { lat, long } = args;
  const res = await fetch(
    `${api.WEATHER_API}?lat=${lat}&long=${long}&timezone=${
      Intl.DateTimeFormat().resolvedOptions().timeZone
    }`
  );

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const data = await res.json();
  return data;
}

export const getNativeLocation = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation || !navigator.geolocation.getCurrentPosition) {
      return reject(new Error("Geolocation not supported!"));
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 0,
    });
  });
