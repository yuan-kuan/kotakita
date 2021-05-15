const reject = () => {
  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    statusCode: 403,
  };
};

const checkSessionAdmin = (req) => req.session && req.session.isAdmin;

exports.reject = reject;
exports.checkSessionAdmin = checkSessionAdmin;
