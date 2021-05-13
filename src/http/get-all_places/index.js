let data = require('@begin/data');

exports.handler = async function http(req) {
  let table = 'place';
  let placeId = 'gaya';
  let d = 'gaya stree';

  await data.set({ table, placeId, d });
  let name = await data.get({ table, placeId });

  console.log('name :>> ', name);
};
