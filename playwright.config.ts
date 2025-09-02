import { PlaywrightConfigBuilder } from '@framework/config/PlaywrightConfigBuilder';

/**
 * Root Playwright Configuration
 * Uses centralized configuration builder to eliminate duplication
 * @see https://playwright.dev/docs/test-configuration
 */
export default PlaywrightConfigBuilder.buildConfig({
  testDir: './tests',
  globalSetupPath: require.resolve('./core/global-setup'),
  globalTeardownPath: require.resolve('./core/global-teardown'),
  projectName: 'root'
});



