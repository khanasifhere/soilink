import jwt from 'jsonwebtoken';

const verifyToken = (roles = []) => {
  if (typeof roles === 'string') roles = [roles];

  return (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: 'Unauthorized: No token' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ msg: 'Forbidden: Insufficient permissions' });
      }

      next();
    } catch {
      res.status(401).json({ msg: 'Unauthorized: Invalid token' });
    }
  };
};

export default verifyToken;
