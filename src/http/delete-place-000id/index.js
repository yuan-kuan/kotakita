let data = require('@begin/data');

exports.handler = async function http(req) {
  if (req.pathParameters !== false) {
    let key = req.pathParameters.id;

    const table = 'place';
    await data.destroy({ table, key });
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
