const places = {
  'pillar-of-sabah': {
    name: 'Pillar of Sabah',
    description: 'A ruin with arts',
  },
  'pasar-besar': {
    name: 'Pasar Besar',
    description: 'Pasar ikan, pasar sayur, pasar apa apa pun ada',
  },
  'gaya-street': {
    name: 'Gaya Street',
    description: 'Sunday, a tamu will be held here.',
  },
};

exports.handler = async function http(req) {
  console.log('place ', req);

  let body;
  if (req.pathParameters !== false) {
    let place = places[req.pathParameters.id];
    if (place == null) {
      return { statusCode: 404 };
    }
    body = JSON.stringify(place);
  } else {
    body = JSON.stringify(['nothing']);
  }
  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    statusCode: 200,
    body: body,
  };
};
