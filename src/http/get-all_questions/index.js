let data = require('@begin/data');

exports.handler = async function http(req) {
  const allQuestions = await data.get({ table: 'question' });

  // const leanQuestions = [];
  // for (let i = 0; i < allQuestions.length; i++) {
  //   const question = allQuestions[i];

  //   leanQuestions.push({
  //     key: question.key,
  //     name: question.name,
  //     order: i,
  //   });
  // }

  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    statusCode: 200,
    body: JSON.stringify(allQuestions),
  };
};
