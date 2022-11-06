import api from "../utils/api";

export async function getLocation(city) {
  const res = await fetch(`${api.GEOLOCATION_API}?place=${city}`);
  const data = await res.json();
  return data;
}
export async function getPlaceNamefromCoordinates(args) {
  var { lat, long } = args;
  const res = await fetch(
    `${api.REVERSE_LOCATION_API}?$&lat=${lat}&long=${long}`
  );
  const data = await res.json();
  return data;
}

export async function getWeatherData(args) {
  var { lat, long } = args;
  const res = await fetch(`${api.WEATHER_API}?lat=${lat}&long=${long}`);
  const data = await res.json();
  return data;
}

export function getNativeLocation(options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}
getNativeLocation({
  enableHighAccuracy: false,
  timeout: 6000,
  maximumAge: 0,
})
  .then((position) => {
    return position;
  })
  .catch((err) => {
    return new Error(err.message);
  });
