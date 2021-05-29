let data = require('@begin/data');
let begin = require('@architect/functions');
let admin = require('@architect/shared/admin');

const changeUrl = async (req) => {
  if (!admin.checkSessionAdmin(req)) {
    return admin.reject();
  }

  if (req.pathParameters !== false) {
    const key = req.pathParameters.id;
    const newUrl = req.body;

    // Copy the place and store it with a new key
    const table = 'place';
    const place = await data.get({ table, key });
    if (place == null) {
      return { statusCode: 404 };
    }

    place.key = newUrl;
    await data.set(place);

    // Delete the old entry
    await data.destroy({ table, key });

    const orderTable = 'order';
    const orderKey = 'place';
    let orderObject = await data.get({ table: orderTable, key: orderKey });
    const orders = orderObject.data;
    console.info(`Old orders: ${JSON.stringify(orders)}`);

    let oldOrder = orders.findIndex((e) => e == key);
    // Delete the old entry
    orders.splice(oldOrder, 1);

    // Insert to new place
    orders.splice(oldOrder, 0, newUrl);

    console.info(`New orders: ${JSON.stringify(orders)}`);

    await data.set({
      table: orderTable,
      key: orderKey,
      data: orders,
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

exports.handler = begin.http.async(changeUrl);
