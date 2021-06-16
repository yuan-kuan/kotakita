let data = require('@begin/data');
let begin = require('@architect/functions');
let admin = require('@architect/shared/admin');

const updateQuestion = async (req) => {
  if (!admin.checkSessionAdmin(req)) {
    return admin.reject();
  }

  if (req.pathParameters !== false) {
    const key = req.pathParameters.id;
    const payload = req.body;

    const table = 'question';
    const question = await data.get({ table, key });
    if (question == null) {
      return { statusCode: 404 };
    }

    console.info(`Old: ${JSON.stringify(question)}`);
    const updatedQuestion = Object.assign(question, payload);
    console.info(`New: ${JSON.stringify(updatedQuestion)}`);

    await data.set({
      table,
      key,
      ...updatedQuestion,
    });
  }
  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    statusCode: 200,
  };
};

exports.handler = begin.http.async(updateQuestion);
