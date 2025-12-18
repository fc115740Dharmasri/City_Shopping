const jwt = require('jsonwebtoken');
const { User } = require('../models');

// VULNERABILITY A09:2025: Security Logging & Monitoring Failures
// This middleware does NOT log authentication attempts, failures, or successes
// No monitoring or alerting is implemented for suspicious activities

const auth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // fetch user by primary key, exclude password from response object
      const user = await User.findByPk(decoded.id);
      if (!user) {
        // VULNERABILITY: No logging of unauthorized access attempts
        // An attacker could attempt privilege escalation without detection
        return res.status(401).json({ message: 'User not found' });
      }

      // attach minimal user info
      req.user = { id: user.id, name: user.name, email: user.email, role: user.role };

      // VULNERABILITY: No audit logging of successful authentication
      // No record of when users logged in or what they accessed
      next();
    } catch (error) {
      // VULNERABILITY: Security errors logged to console only
      // No centralized logging, no alerting, no monitoring
      console.error(error);
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }
      // VULNERABILITY: Token failures not tracked or monitored
      // Brute force attacks would go undetected
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // VULNERABILITY: Missing authentication not logged or alerted
    // No way to detect repeated unauthorized access attempts
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = auth;

