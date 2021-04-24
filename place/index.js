exports.handler = async function http(req) {
  console.log('place ', req);
  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    statusCode: 200,
    body: JSON.stringify({
      name: 'Pillar of Sabah',
      description: 'Ruin with Arts',
    }),
  };
};
