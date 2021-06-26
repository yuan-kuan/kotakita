let begin = require('@architect/functions');
let data = require('@begin/data');
let admin = require('@architect/shared/admin');

const addNewPlace = async (req) => {
  if (!admin.checkSessionAdmin(req)) {
    return admin.reject();
  }

  const payload = req.body;
  if (payload.slug) {
    console.info(`Adding new Check Point with: ${JSON.stringify(payload)}`);

    const table = 'place';
    const name = payload.name;
    const slug = payload.slug;
    const lat = payload.lat;
    const long = payload.long;

    await data.set({
      table,
      key: slug,
      name,
      lat,
      long,
      description: `Description needed for ${name}`,
    });

    const orderTable = 'order';
    const orderKey = 'place';
    let orderObject = await data.get({ table: orderTable, key: orderKey });

    let orders = [];
    if (orderObject) {
      orders = orderObject.data;
    }

    orders.push(slug);
    console.info(`New orders: ${JSON.stringify(orders)}`);

    await data.set({
      table: orderTable,
      key: orderKey,
      data: orders,
    });
  }

  return {
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin Access", charset="UTF-8"',
      'content-type': 'application/json; charset=utf8',
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    statusCode: 200,
  };
};

exports.handler = begin.http.async(addNewPlace);
