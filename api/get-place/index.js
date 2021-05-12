const places = {
  'pillar-of-sabah': {
    name: 'Pillar of Sabah',
    description: 'A ruin with arts',
    photoUrl: 'https://i.postimg.cc/wjG2D9rz/zr-gitlab-ss.jpg',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.058274896732!2d116.07582281535633!3d5.986714530829891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x323b69c6690eebff%3A0x4b4f9853e8ea98ba!2sPillars%20of%20Sabah!5e0!3m2!1sen!2smy!4v1619513080884!5m2!1sen!2smy',
  },
  'pasar-besar': {
    name: 'Pasar Besar',
    description: 'Pasar ikan, pasar sayur, pasar apa apa pun ada',
    photoUrl: 'https://i.postimg.cc/wjG2D9rz/zr-gitlab-ss.jpg',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1668.3698816600186!2d116.07446868978217!3d5.98445705868865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6517ad35df08d90e!2sPasar%20Besar%20Kota%20Kinabalu!5e0!3m2!1sen!2smy!4v1619513435441!5m2!1sen!2smy',
  },
  'gaya-street': {
    name: 'Gaya Street',
    description: 'Sunday, a tamu will be held here.',
    photoUrl: 'https://i.postimg.cc/wjG2D9rz/zr-gitlab-ss.jpg',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2359.426893463533!2d116.07749050326154!3d5.985480912991833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x323b6985f2ca85cb%3A0xaea1169a0a3fc041!2sGaya%20Street%20Sunday%20Market!5e0!3m2!1sen!2smy!4v1619513382547!5m2!1sen!2smy',
  },
};

exports.handler = async function http(req) {
  // console.log(req.session);

  let body;
  if (req.pathParameters !== false) {
    let place = places[req.pathParameters.id];
    if (place == null) {
      return { statusCode: 404 };
    }

    const nexts = Object.entries(places)
      .filter(([key, _]) => key != req.pathParameters.id)
      .map(([key, value]) => [key, value.name]);

    body = JSON.stringify({
      nexts: nexts,
      selected: place,
    });
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
