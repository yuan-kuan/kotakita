let data = require('@begin/data');

exports.handler = async function http(req) {
  const table = 'place';

  const allPlaces = await data.get({ table });

  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    statusCode: 200,
    body: JSON.stringify(allPlaces),
  };
};
