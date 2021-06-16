let begin = require('@architect/functions');
let data = require('@begin/data');
let admin = require('@architect/shared/admin');

const addNewQuestion = async (req) => {
  if (!admin.checkSessionAdmin(req)) {
    return admin.reject();
  }

  const payload = req.body;
  if (payload) {
    console.info(`Adding new Check Point with: ${JSON.stringify(payload)}`);

    const table = 'question';
    const runningId = await data.count({ table });

    await data.set({
      table,
      key: runningId + 1,
      ...payload,
    });
  }

  return {
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin Access", charset="UTF-8"',
      'content-type': 'application/json; charset=utf8',
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    statusCode: 200,
  };
};

exports.handler = begin.http.async(addNewQuestion);
