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

  if (routes.length > 1) {
    const lastTwo = routes.slice(-2);
    console.log('lastTwo :>> ', lastTwo);
    createRatingForRoute(lastTwo[0], lastTwo[1]);
  }

  determineCheckedInStatus();
};

export const getTodayRoutes = async () => {
  const routeAndRating = [];
  const routes = getCurrentRoute();
  for (let i = 0; i < routes.length - 1; i++) {
    const from = routes[i];
    const to = routes[i + 1];
    const ratingkey = getKeyForRating(from, to);
    const rating = getRating(ratingkey);

    routeAndRating.push({
      route: from,
      rating: { key: ratingkey, rating: rating },
    });
  }
  routeAndRating.push({ route: routes.slice(-1)[0], rating: null });

  return routeAndRating;
};

const getKeyForRating = (from, to) => {
  // eslint-disable-next-line no-unused-vars
  const [fromPlace, _] = from;
  const [toPlace, toTime] = to;

  let key = 'ra_';
  key += fromPlace;
  key += '_';
  key += toPlace;
  key += '_';
  key += toTime.toString();

  return key;
};

export const createRatingForRoute = (from, to) => {
  const key = getKeyForRating(from, to);
  console.log('key :>> ', key);

  try {
    window.localStorage.setItem(key, JSON.stringify([]));
  } catch (error) {
    console.error(error);
  }
};

const getRating = (ratingKey) =>
  JSON.parse(window.localStorage.getItem(ratingKey) ?? '[]');

export const rateTheRoute = (ratingKey, value) => {
  let rating = getRating(ratingKey);
  rating.push(value);

  try {
    window.localStorage.setItem(ratingKey, JSON.stringify(rating));
  } catch (error) {
    console.error(error);
  }
};
