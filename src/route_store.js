import { readable, writable } from 'svelte/store';
import { preparePlaceMap } from './place_store';
import { getSimpleRating } from './rating_store';

let visitingPlaceId;
export const visitingPlace = writable({});

export const visitPlace = async (placeId) => {
  await preparePlaceMap();

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

export const checkedIn = writable('new-visit');
const determineCheckedInStatus = () => {
  let routes = getCurrentRoute();
  if (routes.length > 0) {
    const lastVisitedPlaceId = routes.slice(-1)[0][0];

    if (lastVisitedPlaceId == visitingPlaceId) {
      if (routes.length == 1) {
        checkedIn.set('checked-in');
      } else {
        const from = routes.slice(-2)[0];
        const to = routes.slice(-2)[1];

        checkedIn.set({ from, to });
      }
    } else {
      checkedIn.set('new-visit');
    }
  } else checkedIn.set('new-visit');
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
  await preparePlaceMap();

  const routeAndRating = [];
  const routes = getCurrentRoute();
  for (let i = 0; i < routes.length - 1; i++) {
    const from = routes[i];
    const to = routes[i + 1];
    const rating = getSimpleRating(from, to);

    routeAndRating.push({
      from,
      to,
      rating,
    });
  }
  routeAndRating.push({ from: routes.slice(-1)[0], to: null, rating: null });

  return routeAndRating;
};
