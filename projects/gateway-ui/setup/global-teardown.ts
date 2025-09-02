import { FullConfig } from '@playwright/test';
import { EnvManager } from '@framework/config/EnvManager';

async function globalTeardown(config: FullConfig) {
  console.log('Starting Gateway UI global teardown...');
  
  const envManager = EnvManager.getInstance();
  console.log(`Environment: ${envManager.getCurrentEnvironment()}`);
  
  // Gateway UI specific teardown logic:
  // - Clean up authentication sessions
  // - Remove temporary files
  // - Clean up any project-specific resources
  // - Generate test reports if needed
  
  try {
    // Clean up any temporary authentication files
    const fs = require('fs');
    const path = require('path');
    
    const tempFiles = ['storageState.json', 'current-page.png'];
    for (const file of tempFiles) {
      const filePath = path.resolve(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Cleaned up temporary file: ${file}`);
      }
    }
    
    // Reset environment manager instance for next run
    EnvManager.reset();
    
  } catch (error) {
    console.warn('Warning during cleanup:', error instanceof Error ? error.message : String(error));
    // Don't fail teardown on cleanup errors
  }
  
  console.log('Gateway UI global teardown completed');
}

export default globalTeardown;