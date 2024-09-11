const jwt = require('jsonwebtoken');
const key = "00a4c31bcbbbd4d1591eb964748ef30ff06d983d2d1860452e0293579086db58";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization required' });
  }

  try {

    const decoded = jwt.verify(token, key);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
