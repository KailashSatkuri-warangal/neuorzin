import jwt from 'jsonwebtoken';
import db from '../db/database.js';

const JWT_SECRET = process.env.JWT_SECRET || 'neuorzin_crm_super_secret_jwt_key_2026';

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No authentication token provided.' });
  }

  try {
    const decodedUser = jwt.verify(token, JWT_SECRET);
    const user = await db.get('SELECT id, name, email, role, department, status, avatar FROM users WHERE id = ?', [decodedUser.id]);
    
    if (!user || user.status !== 'Active') {
      return res.status(401).json({ error: 'User account not found or inactive.' });
    }
    
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired authentication token.' });
  }
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Access denied. Requires one of roles: [${allowedRoles.join(', ')}]. Current role: ${req.user?.role || 'Guest'}`
      });
    }
    next();
  };
};

