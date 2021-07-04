let data = require('@begin/data');
let begin = require('@architect/functions');
let admin = require('@architect/shared/admin');

const getReport = async (req) => {
  if (!admin.checkSessionAdmin(req)) {
    return admin.reject();
  }

  const allRouteTable = await data.get({ table: 'routes' });

  const routeAndRatings = {};
  for (const t of allRouteTable) {
    const ratings = [];
    var result = await data.get({ table: t.key, limit: 2 });
    ratings.push(...result);

    while (result.cursor) {
      var result = await data.get({
        table: t.key,
        cursor: result.cursor,
        limit: 2,
      });
      if (result.length > 0) {
        ratings.push(...result);
      }
    }
    routeAndRatings[t.key] = ratings;
  }

  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    statusCode: 200,
    body: JSON.stringify(routeAndRatings),
  };
};

exports.handler = begin.http.async(getReport);
