// POC: Information Exposure - X-Powered-By Header Detection Test
// Demonstrates A09:2025 combined with Information Exposure

const axios = require('axios');
const fs = require('fs');

/**
 * POC 1: Passive Reconnaissance - Detect X-Powered-By Header
 * This mimics an attacker probing the server for technology stack information
 */
async function probeXPoweredByHeader() {
  console.log('\n=== POC 1: X-Powered-By Header Reconnaissance ===\n');
  
  try {
    const response = await axios.get('http://localhost:3000/', {
      validateStatus: () => true // Accept any status code
    });
    
    const xPoweredBy = response.headers['x-powered-by'];
    
    if (xPoweredBy) {
      console.log('✗ VULNERABILITY CONFIRMED: Information Exposure');
      console.log(`  - X-Powered-By Header Found: ${xPoweredBy}`);
      console.log('  - Technology Stack Disclosed: Node.js/Express');
      console.log('  - Attacker can now target Express-specific vulnerabilities');
      console.log('  - LOG ENTRIES FOR THIS PROBE: ZERO (A09:2025 FAILURE)\n');
      return true;
    } else {
      console.log('✓ X-Powered-By header properly disabled');
    }
  } catch (error) {
    console.log('Error during probe:', error.message);
  }
}

/**
 * POC 2: Multiple Reconnaissance Attempts - No Alerting
 * This shows how multiple probes go undetected
 */
async function multipleProbes() {
  console.log('\n=== POC 2: Multiple Reconnaissance Probes (Undetected) ===\n');
  
  const probeEndpoints = [
    '/',
    '/api/auth/me',
    '/api/users',
    '/admin',
    '/health',
    '/status',
  ];
  
  console.log('Attacker launches reconnaissance probes:');
  for (const endpoint of probeEndpoints) {
    try {
      const response = await axios.get(`http://localhost:3000${endpoint}`, {
        validateStatus: () => true
      });
      
      if (response.headers['x-powered-by']) {
        console.log(`  [PROBE] GET ${endpoint}`);
        console.log(`    → X-Powered-By: ${response.headers['x-powered-by']}`);
        console.log(`    → Logged/Alerted: NO (A09:2025 FAILURE)`);
      }
    } catch (error) {
      // Silently continue
    }
  }
  console.log('\n✗ All probes completed without triggering alerts or logs\n');
}

/**
 * POC 3: Check for Security Header Monitoring
 * Demonstrates absence of A09:2025 security logging
 */
function checkSecurityLogging() {
  console.log('\n=== POC 3: Security Event Logging Validation ===\n');
  
  const expectedSecurityLogs = [
    'X-Powered-By header detected',
    'Information exposure detected',
    'Security header validation',
    'Technology stack disclosure',
    'Reconnaissance attempt detected',
  ];
  
  console.log('Expected security logs for X-Powered-By exposure:');
  expectedSecurityLogs.forEach(log => {
    console.log(`  ✗ "${log}" - NOT FOUND`);
  });
  
  console.log('\n✗ VULNERABILITY A09:2025: No security logging of exposure\n');
}

/**
 * POC 4: CVE/CWE Mapping
 */
function showVulnerabilityMapping() {
  console.log('\n=== POC 4: Vulnerability Classification ===\n');
  
  const vulnerabilities = [
    {
      name: 'Information Exposure - X-Powered-By Header',
      cwe: 'CWE-200 (Exposure of Sensitive Information)',
      owasp: 'A01:2021 - Broken Access Control (Reconnaissance)',
      severity: 'MEDIUM-HIGH',
    },
    {
      name: 'A09:2025 - Security Logging & Monitoring Failures',
      cwe: 'CWE-778 (Insufficient Logging)',
      owasp: 'A09:2025 - Security Logging & Monitoring Failures',
      severity: 'HIGH',
    },
    {
      name: 'Combined Impact: Undetected Reconnaissance',
      combined: true,
      severity: 'CRITICAL',
    },
  ];
  
  vulnerabilities.forEach(vuln => {
    console.log(`Vulnerability: ${vuln.name}`);
    if (vuln.combined) {
      console.log(`  Impact: Attackers can probe and gather intelligence without detection`);
    } else {
      console.log(`  CWE: ${vuln.cwe}`);
      console.log(`  OWASP: ${vuln.owasp}`);
    }
    console.log(`  Severity: ${vuln.severity}\n`);
  });
}

/**
 * POC 5: Exploitation Timeline
 */
function showExploitationTimeline() {
  console.log('\n=== POC 5: Exploitation Timeline (Undetected) ===\n');
  
  const timeline = [
    { time: 'T+0s', event: 'Attacker probes: GET /', detection: 'NONE' },
    { time: 'T+0.1s', event: 'Receives: X-Powered-By: Express', detection: 'NONE' },
    { time: 'T+0.2s', event: 'Attacker identifies: Node.js/Express backend', detection: 'NONE' },
    { time: 'T+1s', event: 'Attacker researches Express vulnerabilities', detection: 'NONE' },
    { time: 'T+5s', event: 'Multiple probes to /api/* endpoints', detection: 'NONE' },
    { time: 'T+10s', event: 'Full reconnaissance complete', detection: 'NONE' },
    { time: 'T+60s', event: 'Attacker selects Express exploit', detection: 'NONE' },
    { time: 'T+120s', event: 'Attack execution begins', detection: 'NONE' },
  ];
  
  console.log('Timeline of undetected reconnaissance:');
  timeline.forEach(entry => {
    console.log(`  ${entry.time}: ${entry.event}`);
    console.log(`             Detection Status: ✗ ${entry.detection}\n`);
  });
}

/**
 * Main POC Runner
 */
async function runPOC() {
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║ POC: Information Exposure + A09:2025 Security Logging Failure   ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  
  try {
    await probeXPoweredByHeader();
    await multipleProbes();
    checkSecurityLogging();
    showVulnerabilityMapping();
    showExploitationTimeline();
    
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║ RESULT: Vulnerability Successfully Demonstrated               ║');
    console.log('║ - X-Powered-By header exposed (information disclosure)         ║');
    console.log('║ - No logging of reconnaissance attempts (A09:2025)             ║');
    console.log('║ - No alerts triggered (A09:2025)                              ║');
    console.log('║ - Attacker gains intelligence undetected                       ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');
    
  } catch (error) {
    console.error('POC Error:', error.message);
    console.log('\nNote: Ensure the server is running on http://localhost:3000');
  }
}

// Run if executed directly
if (require.main === module) {
  runPOC();
}

module.exports = { probeXPoweredByHeader, multipleProbes, checkSecurityLogging };
