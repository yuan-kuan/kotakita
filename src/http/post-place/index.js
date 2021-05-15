let begin = require('@architect/functions');
let data = require('@begin/data');

const toParamCase = (str) => {
  str = str.toLowerCase();
  str = str.replace(/[ ]/g, '-');
  return str;
};

const reject = () => {
  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    statusCode: 403,
  };
};

const addNewPlace = async (req) => {
  console.log('req :>> ', req);
  if (!req.session || !req.session.isAdmin) {
    return reject();
  }

  const payload = req.body;
  if (payload.newPlace) {
    const table = 'place';
    const name = payload.newPlace;
    await data.set({
      table,
      key: toParamCase(name),
      name,
      description: `Description needed for ${name}`,
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

exports.handler = begin.http.async(addNewPlace);
