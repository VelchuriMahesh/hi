import jwt from 'jsonwebtoken';

export default function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Unauthorized. Please sign in again.' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-change-me');
    return next();
  } catch {
    return res.status(401).json({ message: 'Session expired. Please sign in again.' });
  }
}
