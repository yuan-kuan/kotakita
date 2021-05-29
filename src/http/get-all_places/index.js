let data = require('@begin/data');

exports.handler = async function http(req) {
  const orderTable = 'order';
  const orderKey = 'place';
  const orders = await data.get({ table: orderTable, key: orderKey });

  // let getAllPairs = [];
  // for (const key of orders.data) {
  //   getAllPairs.push({
  //     table: 'place',
  //     key,
  //   });
  // }
  // const allPlaces = await data.get(getAllPairs);

  // The above commented out code might come in handy if small optimization is needed
  const allPlaces = await data.get({ table: 'place' });
  allPlaces.sort(
    (a, b) => orders.data.indexOf(a.key) - orders.data.indexOf(b.key)
  );
  console.log('orders :>> ', orders);
  console.log('allPlaces :>> ', allPlaces);

  const leanPlaces = [];
  for (let i = 0; i < allPlaces.length; i++) {
    const place = allPlaces[i];

    leanPlaces.push({
      key: place.key,
      name: place.name,
      order: i,
    });
  }

  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    statusCode: 200,
    body: JSON.stringify(leanPlaces),
  };
};
