let data = require('@begin/data');
let begin = require('@architect/functions');
let admin = require('@architect/shared/admin');
let rating_utils = require('@architect/shared/rating_utils');

const updateRating = async (req) => {
  if (!admin.checkSessionAdmin(req)) {
    return admin.reject();
  }

  const payload = req.body;
  const dataKey = rating_utils.dataKeysOfRating(payload);

  // const rating = await data.get(dataKey);

  await data.set({
    table: dataKey.table,
    key: dataKey.key,
    ...payload.rating,
  });

  // Add this table to route key
  await data.set({
    table: 'routes',
    key: dataKey.table,
  });

  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    statusCode: 200,
  };
};

exports.handler = begin.http.async(updateRating);
