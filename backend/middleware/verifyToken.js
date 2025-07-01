import jwt from 'jsonwebtoken';

const verifyToken = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: 'Unauthorized: No token' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ msg: 'Forbidden: Insufficient role' });
      }
      next();
    } catch {
      res.status(401).json({ msg: 'Unauthorized: Invalid token' });
    }
  };
};

export default verifyToken;
