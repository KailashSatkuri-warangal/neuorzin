import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import db from '../db/database.js';
import { logAudit } from '../services/auditService.js';

const JWT_SECRET = process.env.JWT_SECRET || 'neuorzin_crm_super_secret_jwt_key_2026';

export const login = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ? AND status = "Active"').get(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials or account inactive' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role, department: user.department },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    logAudit({
      userId: user.id,
      userName: user.name,
      action: 'USER_LOGIN',
      entityType: 'User',
      entityId: user.id,
      changes: { ip: req.ip, userAgent: req.headers['user-agent'] }
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        department: user.department,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error during login' });
  }
};

export const getMe = (req, res) => {
  try {
    const user = db.prepare('SELECT id, name, email, phone, role, department, avatar, status, created_at FROM users WHERE id = ?').get(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsers = (req, res) => {
  try {
    const users = db.prepare('SELECT id, name, email, phone, role, department, avatar, status, created_at FROM users ORDER BY name ASC').all();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = (req, res) => {
  try {
    const { name, email, password, role, department, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hash = bcrypt.hashSync(password, 10);
    const userId = `USR-${uuidv4().substring(0, 6).toUpperCase()}`;

    db.prepare(`
      INSERT INTO users (id, name, email, password, role, department, phone, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Active')
    `).run(userId, name, email, hash, role || 'Sales Executive', department || 'Sales', phone || null);

    logAudit({
      userId: req.user.id,
      userName: req.user.name,
      action: 'USER_CREATED',
      entityType: 'User',
      entityId: userId,
      changes: { name, email, role, department }
    });

    res.status(201).json({ id: userId, message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
