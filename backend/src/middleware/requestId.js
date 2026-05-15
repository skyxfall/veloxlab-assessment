const { randomUUID } = require('crypto');

function readIncomingId(header) {
  if (typeof header === 'string') return header;
  if (Array.isArray(header) && typeof header[0] === 'string') return header[0];
  return null;
}

module.exports = function requestId() {
  return (req, res, next) => {
    req.id = readIncomingId(req.headers['x-request-id']) || randomUUID();
    res.setHeader('X-Request-Id', req.id);
    next();
  };
};
