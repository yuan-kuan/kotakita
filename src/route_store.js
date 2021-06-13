import { readable, writable } from 'svelte/store';

let visitingPlaceId;
export const visitingPlace = writable({});

export const visitPlace = async (placeId) => {
  try {
    let respond = await fetch('/place/' + placeId);
    if (respond.ok) {
      let data = await respond.json();

      visitingPlace.set(data.selected);
      visitingPlaceId = placeId;
      determineCheckedInStatus();
    } else {
      throw respond;
    }
  } catch (error) {
    console.error(error);
  }
};

const getTodayKey = () => {
  const now = new Date();
  let key = `${now.getFullYear() - 2000}`;
  key += now.getMonth().toString().padStart(2, '0');
  key += now.getDate().toString().padStart(2, '0');
  return key;
};

const keyForRoute = (dayKey) => `ro_${dayKey}`;

const routeGetter = () => {
  let routes = JSON.parse(
    window.localStorage.getItem(keyForRoute(getTodayKey())) ?? '[]'
  );
  return () => routes;
};
const getCurrentRoute = routeGetter();

let resetRoute;
export const routes = readable([], (set) => {
  resetRoute = set;

  resetRoute(getCurrentRoute());
});

export const checkedIn = writable(false);
const determineCheckedInStatus = () => {
  let routes = getCurrentRoute();
  if (routes.length > 0)
    checkedIn.set(routes.slice(-1)[0][0] == visitingPlaceId);
  else checkedIn.set(false);
};

export const checkIn = () => {
  let routes = getCurrentRoute();
  routes.push([visitingPlaceId, Date.now()]);
  try {
    window.localStorage.setItem(
      keyForRoute(getTodayKey()),
      JSON.stringify(routes)
    );
  } catch (error) {
    console.error(error);
  }

  determineCheckedInStatus();
};

export const getTodayRoutes = async () => {
  let routes = getCurrentRoute();

  console.log('routes :>> ', routes);
  return routes;
};
