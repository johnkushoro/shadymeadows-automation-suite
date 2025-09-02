import { PlaywrightConfigBuilder } from '@framework/config/PlaywrightConfigBuilder';

/**
 * Gateway UI Playwright Configuration
 * Uses centralized configuration builder from the framework
 * @see https://playwright.dev/docs/test-configuration
 */
export default PlaywrightConfigBuilder.buildConfig({
  testDir: './tests',
  globalSetupPath: require.resolve('./setup/global-setup'),
  globalTeardownPath: require.resolve('./setup/global-teardown'),
  projectName: 'gateway-ui'
});