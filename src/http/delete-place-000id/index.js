let data = require('@begin/data');
let begin = require('@architect/functions');
let admin = require('@architect/shared/admin');

const deletePlace = async (req) => {
  if (!admin.checkSessionAdmin(req)) {
    return admin.reject();
  }
  if (req.pathParameters !== false) {
    let key = req.pathParameters.id;

    // Delete the data
    const table = 'place';
    await data.destroy({ table, key });

    // Remove it from order
    const orderTable = 'order';
    const orderKey = 'place';
    let orderObject = await data.get({ table: orderTable, key: orderKey });
    const orders = orderObject.data;

    let oldOrder = orders.findIndex((e) => e == key);
    // Delete the old entry
    orders.splice(oldOrder, 1);

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

exports.handler = begin.http.async(deletePlace);
