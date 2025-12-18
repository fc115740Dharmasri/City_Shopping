// Weak logging implementation - VULNERABILITY A09:2025
// This logger intentionally lacks proper security event logging and monitoring
// It does NOT log security events, authentication failures, or sensitive operations

const logger = {
  // Minimal logging with no security context
  info: (msg) => {
    console.log(`[INFO] ${msg}`);
  },
  
  error: (msg) => {
    console.log(`[ERROR] ${msg}`);
  },
  
  // VULNERABILITY: No security event logging
  // Does not log:
  // - Failed authentication attempts
  // - Unauthorized access attempts
  // - Privilege escalation attempts
  // - Sensitive data access
  // - Administrative actions
  
  securityLog: (event, details) => {
    // Intentionally disabled to demonstrate A09:2025
    // In production, this should log to a secure audit trail
  },
  
  auditLog: (action, user, resource) => {
    // VULNERABILITY: Audit logging is not implemented
    // No records of who accessed what and when
  }
};

module.exports = logger;
