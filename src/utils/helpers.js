const DATE = new Date();
const UNIQUE_ID = String(DATE.getDate() + DATE.getMonth());

export function isFreshDay() {
  const STORAGE_NAME = "stratus-last-update";
  var lastChecked = localStorage.getItem(STORAGE_NAME);

  if (lastChecked == null) {
    localStorage.setItem(STORAGE_NAME, UNIQUE_ID);
    return true;
  } else {
    if (lastChecked === UNIQUE_ID) {
      return false;
    } else {
      localStorage.setItem(STORAGE_NAME, UNIQUE_ID);
      return true;
    }
  }
}
export function isFreshInstall() {
  const STORAGE_NAME = "stratus-first-install";
  var hasInstalled = localStorage.getItem(STORAGE_NAME);
  return hasInstalled === null || hasInstalled === undefined;
}

export function getUID() {
  return UNIQUE_ID;
}

export function getDateFromEpoch(epoch) {
  var d = new Date(epoch * 1000);
  return d.toLocaleString();
}

export function getDayFromEpoch(epoch) {
  var newDate = new Date(epoch * 1000);
  return newDate.toLocaleString(window.navigator.language, { weekday: "long" });
}
