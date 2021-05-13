let data = require('@begin/data');

exports.handler = async function http(req) {
  let body;
  if (req.pathParameters !== false) {
    let key = req.pathParameters.id;

    const table = 'place';
    const place = await data.get({ table, key });
    if (place == null) {
      return { statusCode: 404 };
    }

    body = JSON.stringify({
      // nexts: nexts,
      selected: place,
    });
  } else {
    body = JSON.stringify(['nothing']);
  }
  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    statusCode: 200,
    body: body,
  };
};
