import { readable } from 'svelte/store';
import { allQuestions } from './question_store';
import { userProfile } from './user_store';

let profile;
userProfile.subscribe((p) => {
  profile = p;
});

const rateRemote = async () => {
  const [, to, from, time] = activeRatingKey.split('_');
  const payload = {
    to,
    from,
    time,
    userProfile: profile,
    rating: activeRating,
  };

  try {
    let respond = await fetch('/rating', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!respond.ok) {
      console.error(respond);
    }
  } catch (error) {
    console.error(error);
  }
};

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
      currentIndex: currentRatingQuestionIndex,
      totalQuestion: questionKeys.length,
    });
  } else {
    const question = questions[questionKeys[currentRatingQuestionIndex]];
    const rating = activeRating[questionKeys[currentRatingQuestionIndex]];

    settingCurrentRating({
      rateCompleted: false,
      questionKey: question.key,
      questionType: question.type,
      questionBody: question.body,
      value: rating ? parseInt(rating[0]) : -1,
      comment: rating ? rating[1] : undefined,
      currentIndex: currentRatingQuestionIndex,
      totalQuestion: questionKeys.length,
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

export const rate = async (questionId, value, comment) => {
  let theRate = activeRating[questionId];
  if (theRate == undefined || theRate[0] != value || theRate[1] != comment) {
    activeRating[questionId] = [value, comment];
    try {
      window.localStorage.setItem(
        activeRatingKey,
        JSON.stringify(activeRating)
      );

      await rateRemote();

      determineNextRating();
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log('rating did not change, just next');
    currentRatingQuestionIndex++;
    presentCurrentRating();
  }
};

export const visitPrevious = () => {
  if (currentRatingQuestionIndex > 0) {
    currentRatingQuestionIndex--;
    presentCurrentRating();
  }
};

export const getSimpleRating = (from, to) =>
  JSON.parse(window.localStorage.getItem(getKeyForRating(from, to)) ?? '{}');
