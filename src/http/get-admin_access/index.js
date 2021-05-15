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
  console.log('auth :>> ', auth);

  if (!auth) {
    return reject();
  }

  const bin = auth.split(' ')[1];
  console.log('bin :>> ', bin);

  const text = Buffer.from(bin, 'base64').toString();

  const [user, password] = text.split(/:/);
  console.log('user :>> ', user);
  console.log('password :>> ', password);

  if (user != password) return reject();

  const session = req.session ?? {};
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
