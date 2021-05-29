let begin = require('@architect/functions');
let data = require('@begin/data');
let admin = require('@architect/shared/admin');

const toParamCase = (str) => {
  str = str.toLowerCase();
  str = str.replace(/[ ]/g, '-');
  return str;
};

const addNewPlace = async (req) => {
  if (!admin.checkSessionAdmin(req)) {
    return admin.reject();
  }

  const payload = req.body;
  if (payload.slug) {
    const table = 'place';
    const name = payload.name;
    const slug = payload.slug;
    await data.set({
      table,
      key: slug,
      name,
      description: `Description needed for ${name}`,
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
