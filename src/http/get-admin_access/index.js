let begin = require('@architect/functions');

const reject = () => {
  return {
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin Access", charset="UTF-8"',
      'content-type': 'application/json; charset=utf8',
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    statusCode: 401,
  };
};

const requestAdminAccess = async (req) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return reject();
  }

  const [_, bin] = auth.split(' ');
  const text = Buffer.from(bin, 'base64').toString();

  const [user, password] = text.split(/:/);
  if (user != process.env.ADMIN_NAME || password != process.env.ADMIN_PASS)
    return reject();

  const session = req.session || {};
  session['isAdmin'] = true;

  return {
    session,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin Access", charset="UTF-8"',
      'content-type': 'application/json; charset=utf8',
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    location: '/',
    statusCode: 302,
  };
};

exports.handler = begin.http.async(requestAdminAccess);
