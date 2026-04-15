import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

function safeCompare(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));
  if (leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@shrusara.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    const jwtSecret = process.env.JWT_SECRET || 'dev-secret-change-me';

    const emailMatches = safeCompare(String(email).toLowerCase(), adminEmail.toLowerCase());
    
    // Compare plain text or hash
    const passwordMatches = adminPasswordHash
      ? await bcrypt.compare(password, adminPasswordHash)
      : safeCompare(password, adminPassword);

    if (!emailMatches || !passwordMatches) {
      return res.status(401).json({ message: 'Invalid admin credentials.' });
    }

    const token = jwt.sign(
      { email: adminEmail, role: 'admin' },
      jwtSecret,
      { expiresIn: '12h' }
    );

    return res.json({
      token,
      admin: { email: adminEmail }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Auth error', error: error.message });
  }
}