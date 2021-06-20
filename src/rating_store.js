import { readable } from 'svelte/store';
import { allQuestions } from './question_store';

let questions;
let questionKeys;
allQuestions.subscribe((qs) => {
  questions = qs;
  questionKeys = Object.keys(questions).sort();
});

let activeRatingKey;
let activeRating;
let settingCurrentRating;
export const currentRating = readable([], (set) => {
  settingCurrentRating = set;
});

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

let currentRatingQuestionIndex = 0;
const presentCurrentRating = () => {
  if (currentRatingQuestionIndex >= questionKeys.length) {
    settingCurrentRating({
      rateCompleted: true,
    });
  } else {
    const question = questions[questionKeys[currentRatingQuestionIndex]];
    settingCurrentRating({
      rateCompleted: false,
      questionKey: question.key,
      questionType: question.type,
      questionBody: question.body,
    });
  }
};

const determineNextRating = () => {
  const latestRatedQuestionKey = Object.keys(activeRating).sort().pop();

  currentRatingQuestionIndex = 0;
  if (latestRatedQuestionKey != undefined) {
    currentRatingQuestionIndex =
      questionKeys.indexOf(latestRatedQuestionKey) + 1;
  }

  presentCurrentRating();
};

export const startRating = async (from, to) => {
  activeRatingKey = getKeyForRating(from, to);
  activeRating = await getSimpleRating(from, to);

  determineNextRating();
};

export const rate = (questionId, value, comment) => {
  activeRating[questionId] = [value, comment];

  try {
    window.localStorage.setItem(activeRatingKey, JSON.stringify(activeRating));
    determineNextRating();
  } catch (error) {
    console.error(error);
  }
};

export const getSimpleRating = (from, to) =>
  JSON.parse(window.localStorage.getItem(getKeyForRating(from, to)) ?? '{}');
