let data = require('@begin/data');

const toParamCase = (str) => {
  str = str.toLowerCase();
  str = str.replace(/[ ]/g, '-');
  return str;
};

exports.handler = async function http(req) {
  const payload = JSON.parse(req.body);
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
      'content-type': 'application/json; charset=utf8',
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    statusCode: 200,
  };
};
