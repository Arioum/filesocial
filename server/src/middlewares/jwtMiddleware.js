const jwt = require('jsonwebtoken');

const requireAuthentication = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'Missing token' });
  }

  const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

  try {
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

const authorize = (req, res) => {
  return res.status(200).json({ message: 'Token validation success', user: req.user });
};

module.exports = { requireAuthentication, authorize };
