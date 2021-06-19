import { readable } from 'svelte/store';

let activeRatingKey;
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
  key += toTime.toString(36);

  return key;
};

export const startRating = async (from, to) => {
  activeRatingKey = getKeyForRating(from, to);

  activeRating = await getSimpleRating(from, to);
  settingCurrentRating(activeRating);
};

export const rate = (questionId, value, comment) => {
  activeRating[questionId] = [value, comment];
  console.log('activeRating :>> ', activeRating);

  try {
    window.localStorage.setItem(activeRatingKey, JSON.stringify(activeRating));
    settingCurrentRating(activeRating);
  } catch (error) {
    console.error(error);
  }
};

export const getSimpleRating = (from, to) =>
  JSON.parse(window.localStorage.getItem(getKeyForRating(from, to)) ?? '{}');
