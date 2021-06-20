import { readable } from 'svelte/store';

// const questionVersionKey = 'qv';

let settingAllQuestion;
export const allQuestions = readable([], (set) => {
  settingAllQuestion = set;
  prepareQuestion();
});

export const prepareQuestion = async () => {
  try {
    let respond = await fetch('/all-questions');
    const questions = await respond.json();
    const questionObject = {};
    questions.forEach((q) => {
      questionObject[q.key] = q;
    });
    console.log('questionObject :>> ', questionObject);
    settingAllQuestion(questionObject);
  } catch (error) {
    console.error(error);
  }
};

export const addQuestion = async (question) => {
  try {
    let respond = await fetch('/question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    });

    if (respond.ok) {
      await prepareQuestion();
    } else {
      console.error(respond);
    }
  } catch (error) {
    console.error(error);
  }
};

export const editQuestion = async (questionId, question) => {
  try {
    let respond = await fetch('/question/' + questionId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    });

    if (respond.ok) {
      await prepareQuestion();
    } else {
      console.error(respond);
    }
  } catch (error) {
    console.error(error);
  }
};
