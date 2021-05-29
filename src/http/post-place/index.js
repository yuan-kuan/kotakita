let begin = require('@architect/functions');
let data = require('@begin/data');
let admin = require('@architect/shared/admin');

const addNewPlace = async (req) => {
  if (!admin.checkSessionAdmin(req)) {
    return admin.reject();
  }

  const payload = req.body;
  if (payload.slug) {
    const orderTable = 'order';
    const orderKey = 'place';
    let orders = await data.get({ table: orderTable, key: orderKey });
    if (orders == null) {
      orders = { data: [] };
    }

    const table = 'place';
    const name = payload.name;
    const slug = payload.slug;

    await data.set({
      table,
      key: slug,
      name,
      description: `Description needed for ${name}`,
    });

    orders.data.push(slug);
    await data.set({
      table: orderTable,
      key: orderKey,
      ...orders,
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
