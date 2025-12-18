// VULNERABILITY: Inadequate Request Logging & Monitoring
// This middleware intentionally lacks comprehensive security logging
// It does NOT track sensitive operations or suspicious patterns

const requestLogger = (req, res, next) => {
  // VULNERABILITY A09:2025: Minimal logging with no security context
  // - No logging of request paths that access sensitive resources
  // - No monitoring of request parameters or payloads
  // - No IP address tracking for suspicious access patterns
  // - No user action auditing
  // - No response status monitoring for anomalies
  
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    // Basic logging without security context
    console.log(`${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
    // VULNERABILITY: No logging of:
    // - User ID attempting the request
    // - Sensitive endpoints being accessed
    // - Failed authorization attempts
    // - Privilege escalation attempts
    // - Data modification operations
  });
  
  next();
};

module.exports = requestLogger;
