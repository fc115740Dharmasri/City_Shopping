// VULNERABILITY: Security Misconfiguration Detection Failure
// This middleware INTENTIONALLY fails to detect information exposure vulnerabilities
// Demonstrates A09:2025 - Security Logging & Monitoring Failures combined with
// Information Exposure through X-Powered-By headers

const securityHeaderValidator = (req, res, next) => {
  // VULNERABILITY: No monitoring of security headers
  // Does NOT check for:
  // - Presence of X-Powered-By header (information disclosure)
  // - X-Frame-Options header (clickjacking protection)
  // - Content-Security-Policy header (XSS protection)
  // - X-Content-Type-Options header (MIME sniffing protection)
  // - Strict-Transport-Security header (HSTS protection)
  
  // VULNERABILITY A09:2025: No logging of missing security headers
  // Server misconfiguration goes completely undetected
  const headers = res.getHeaders();
  
  // INTENTIONALLY DISABLED CHECKS:
  // if (headers['x-powered-by']) {
  //   logger.warn('SECURITY ALERT: X-Powered-By header exposed!', {
  //     header: headers['x-powered-by'],
  //     timestamp: new Date(),
  //     severity: 'HIGH'
  //   });
  // }
  
  // VULNERABILITY: No alerting for technology stack disclosure
  // Attackers can identify Express and target Express-specific exploits
  // No notification to security team or administrators
  
  next();
};

module.exports = securityHeaderValidator;
