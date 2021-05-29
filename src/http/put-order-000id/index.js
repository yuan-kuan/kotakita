let data = require('@begin/data');
let begin = require('@architect/functions');
let admin = require('@architect/shared/admin');

const changeOrder = async (req) => {
  if (!admin.checkSessionAdmin(req)) {
    return admin.reject();
  }

  if (req.pathParameters !== false) {
    const key = req.pathParameters.id;
    const newOrder = req.body;

    const orderTable = 'order';
    const orderKey = 'place';
    let orderObject = await data.get({ table: orderTable, key: orderKey });
    const orders = orderObject.data;

    console.info(`Old orders: ${JSON.stringify(orders)}`);

    let oldOrder = orders.findIndex((e) => e == key);
    // Delete the old entry
    orders.splice(oldOrder, 1);

    // Insert to new place
    orders.splice(newOrder - 1, 0, key);

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

exports.handler = begin.http.async(changeOrder);
