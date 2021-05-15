let data = require('@begin/data');
let begin = require('@architect/functions');
let admin = require('@architect/shared/admin');

const updatePlace = async (req) => {
  if (!admin.checkSessionAdmin(req)) {
    return admin.reject();
  }

  if (req.pathParameters !== false) {
    const key = req.pathParameters.id;
    const payload = req.body;

    const table = 'place';
    const place = await data.get({ table, key });
    if (place == null) {
      return { statusCode: 404 };
    }

    const updatedPlace = Object.assign(place, payload);
    console.log('updatedPlace :>> ', updatedPlace);

    await data.set({
      table,
      key,
      ...updatedPlace,
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

exports.handler = begin.http.async(updatePlace);
