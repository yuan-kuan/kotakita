import { readable } from 'svelte/store';

let activeRating;
let settingCurrentRating;
export const currentRating = readable(
  [],
  (set) => (settingCurrentRating = set)
);

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

export const startRating = (from, to) => {
  // const key = getKeyForRating(from, to);

  activeRating = [];
  settingCurrentRating(activeRating);
};

export const rate = (questionId, value, comment) => {
  activeRating.push([questionId, value, comment]);
  console.log('activeRating :>> ', activeRating);
  settingCurrentRating(activeRating);
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

export const getSimpleRating = (from, to) =>
  JSON.parse(window.localStorage.getItem(getKeyForRating(from, to)) ?? '[]');
