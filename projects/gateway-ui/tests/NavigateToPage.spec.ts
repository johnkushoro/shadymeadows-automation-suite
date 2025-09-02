import { test, expect } from '@playwright/test';
import { EnvManager } from '@framework/config/EnvManager';

test.describe('Page Navigation Tests', () => {
  let envManager: EnvManager;

  test.beforeEach(async ({ page }) => {
    // Initialize environment manager
    envManager = EnvManager.getInstance();
  });

  test('should navigate to login page', async ({ page }) => {
    try {
      console.log('Base URL from test context:', test.info().project.use.baseURL);
      console.log('Current URL before navigation:', page.url());

      // Navigate to the base URL from environment configuration
      const baseUrl = envManager.getBaseUrl();
      await page.goto(baseUrl);

      // Wait for the page to load
      await page.waitForLoadState('networkidle');

      await page.waitForTimeout(20000)

      console.log('Successfully navigated to QA URL');
    } catch (error) {
      console.log('Failed to navigate to QA URL:', error instanceof Error ? error.message : String(error));
      throw error; // Re-throw to fail the test
    }
  });
});