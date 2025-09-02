import { chromium, FullConfig } from '@playwright/test';
import { EnvManager } from '@framework/config/EnvManager';

async function globalSetup(config: FullConfig) {
  console.log('Starting Gateway UI global setup...');
  
  // Initialize environment manager for this project
  const envManager = EnvManager.getInstance();
  console.log(`Environment: ${envManager.getCurrentEnvironment()}`);
  console.log(`Base URL: ${envManager.getBaseUrl()}`);
  
  // Validate configuration
  const validation = envManager.validateConfig();
  if (!validation.isValid) {
    console.error('Configuration validation failed:');
    validation.errors.forEach(error => console.error(`  - ${error}`));
    throw new Error('Invalid configuration');
  }
  
  // Gateway UI specific setup logic:
  // - Verify base URL is accessible
  // - Set up authentication session if needed
  // - Initialize any project-specific resources
  
  try {
    // Test connectivity to the application
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    console.log('Testing connectivity to application...');
    await page.goto(envManager.getBaseUrl(), {
      waitUntil: 'domcontentloaded',
      timeout: envManager.getTimeout()
    });
    
    console.log('Application is accessible');
    await browser.close();
    
  } catch (error) {
    console.warn('Could not verify application connectivity:', error instanceof Error ? error.message : String(error));
    // Don't fail setup if connectivity test fails - might be expected in some environments
  }
  
  console.log('Gateway UI global setup completed');
}

export default globalSetup;