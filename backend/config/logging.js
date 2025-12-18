// VULNERABILITY: Insecure Logging Configuration
// This configuration intentionally lacks security-focused logging
// Demonstrates A09:2025 - Security Logging & Monitoring Failures

const loggingConfig = {
  // VULNERABILITY: Console-only logging
  // No file persistence, no log rotation, no protection
  console: true,
  
  // VULNERABILITY: No log level distinction for security events
  // All events treated equally, no priority system
  level: 'info',
  
  // VULNERABILITY: No log retention policy
  // Logs can be lost if application crashes
  persistence: false,
  
  // VULNERABILITY: No log encryption or integrity protection
  logEncryption: false,
  
  // VULNERABILITY: No sensitive data masking
  // Passwords, tokens, and secrets may be logged
  maskSensitiveData: false,
  
  // VULNERABILITY: No request/response logging
  logRequests: false,
  logResponses: false,
  
  // VULNERABILITY: No audit logging of security-related events
  auditLogging: {
    enabled: false,
    trackAuthEvents: false,
    trackAuthorizationFailures: false,
    trackDataAccess: false,
    trackPrivilegeChanges: false,
  },
  
  // VULNERABILITY: No alerting configuration
  alerting: {
    enabled: false,
    channels: [], // No email, Slack, PagerDuty integration
  },
  
  // VULNERABILITY: No monitoring dashboard
  monitoring: {
    enabled: false,
    metricsCollection: false,
    anomalyDetection: false,
  },
};

// VULNERABILITY: Stack trace exposure
function logError(error) {
  // INSECURE: Full stack traces logged without sanitization
  console.error('ERROR:', error.stack);
  // INSECURE: Could expose file paths, system details, internal logic
}

// VULNERABILITY: No context preservation
function logActivity(activity) {
  // INSECURE: No user context, IP, timestamp, or request ID
  console.log('ACTIVITY:', activity);
}

module.exports = loggingConfig;
