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

    if (payload.isDelete) {
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
    } else {
      const place = await data.get({ table, key });
      if (place == null) {
        return { statusCode: 404 };
      }

      console.info(`Old: ${JSON.stringify(place)}`);
      const updatedPlace = Object.assign(place, payload);
      console.info(`New: ${JSON.stringify(updatedPlace)}`);

      await data.set({
        table,
        key,
        ...updatedPlace,
      });
    }
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
