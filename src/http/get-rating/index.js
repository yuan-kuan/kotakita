let data = require('@begin/data');
let begin = require('@architect/functions');
let admin = require('@architect/shared/admin');
// let rating_utils = require('@architect/shared/rating_utils');

const getRating = async (req) => {
  if (!admin.checkSessionAdmin(req)) {
    return admin.reject();
  }

  // const payload = req.body;
  // const dataKey = rating_utils.dataKeysOfRating(payload);

  // const rating = await data.get(dataKey);

  // console.info(`Old: ${JSON.stringify(rating)}`);
  // const updatedrating = Object.assign(rating, payload.rating);
  // console.info(`New: ${JSON.stringify(updatedrating)}`);

  // await data.set({
  //   table: dataKey.table,
  //   key: dataKey.key,
  //   ...updatedrating,
  // });

  const allRouteTable = await data.get({ table: 'routes' });
  console.log('allRouteTable :>> ', allRouteTable);

  for (const t of allRouteTable) {
    const rating = await data.get({ table: t.key });
    console.log('rating :>> ', rating);
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

exports.handler = begin.http.async(getRating);
