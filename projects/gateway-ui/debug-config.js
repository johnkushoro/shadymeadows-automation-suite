// Debug script to check environment configuration
process.env.TEST_ENV = 'qa';

const { envManager } = require('@fairstone/ui-automation-framework');

console.log('Current Environment:', envManager.getCurrentEnvironment());
console.log('Base URL:', envManager.getBaseUrl());
console.log('API URL:', envManager.getApiUrl());
console.log('Test Credentials:', envManager.getTestCredentials());
console.log('Full Config:', envManager.getConfig());