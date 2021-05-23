import { writable } from 'svelte/store';

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

let routes = [];

export const checkedIn = writable(false);
const determineCheckedInStatus = () => {
  if (routes.length > 0) checkedIn.set(routes.slice(-1)[0] == visitingPlaceId);
  else checkedIn.set(false);
};

export const checkIn = () => {
  routes.push(visitingPlaceId);
  determineCheckedInStatus();
};

export const getTodayRoutes = async () => {
  console.log('routes :>> ', routes);
  return routes;
};
