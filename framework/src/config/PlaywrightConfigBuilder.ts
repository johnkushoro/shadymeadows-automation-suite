import { defineConfig, devices } from '@playwright/test';
import { envManager } from './EnvManager';
import { FrameworkConfig } from '../types';

/**
 * Playwright Configuration Builder
 * Centralized configuration builder to eliminate duplication
 */
export class PlaywrightConfigBuilder {
  private static readonly commonDesktopViewport = { width: 1920, height: 1080 };
  
  private static readonly commonArgs = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--no-first-run',
    '--disable-web-security',
    '--disable-blink-features=AutomationControlled',
    '--disable-features=VizDisplayCompositor',
    '--disable-ipc-flooding-protection',
    '--disable-renderer-backgrounding',
    '--disable-backgrounding-occluded-windows',
    '--disable-field-trial-config',
    '--disable-back-forward-cache',
    '--disable-hang-monitor',
    '--disable-prompt-on-repost',
    '--disable-sync',
    '--metrics-recording-only',
    '--no-report-upload',
    '--safebrowsing-disable-auto-update',
    '--enable-automation=false',
    '--password-store=basic',
    '--use-mock-keychain'
  ];

  private static getLaunchOptions(args: string[] = this.commonArgs) {
    return {
      args,
      slowMo: envManager.getSlowMo(),
      timeout: 60000,
    };
  }

  private static getBrowserProject() {
    const browser = envManager.getBrowser().toLowerCase();

    switch (browser) {
      case 'chromium':
      case 'chrome':
        return {
          name: 'chromium',
          use: {
            channel: 'chrome',
            ...devices['Desktop Chrome'],
            viewport: this.commonDesktopViewport,
            launchOptions: this.getLaunchOptions(),
          },
        };

      case 'edge':
      case 'msedge':
        return {
          name: 'edge',
          use: {
            channel: 'msedge',
            ...devices['Desktop Edge'],
            viewport: this.commonDesktopViewport,
            launchOptions: this.getLaunchOptions(),
          },
        };

      case 'firefox':
        return {
          name: 'firefox',
          use: {
            ...devices['Desktop Firefox'],
            viewport: this.commonDesktopViewport,
            launchOptions: {
              slowMo: envManager.getSlowMo(),
            },
          },
        };

      case 'webkit':
      case 'safari':
        return {
          name: 'webkit',
          use: {
            ...devices['Desktop Safari'],
            viewport: this.commonDesktopViewport,
            launchOptions: {
              slowMo: envManager.getSlowMo(),
            },
          },
        };

      default:
        console.warn(`Unknown browser: ${browser}. Falling back to chromium.`);
        return {
          name: 'chromium',
          use: {
            channel: 'chrome',
            ...devices['Desktop Chrome'],
            viewport: this.commonDesktopViewport,
            launchOptions: this.getLaunchOptions(),
          },
        };
    }
  }

  public static buildConfig(options: {
    testDir: string;
    globalSetupPath?: string;
    globalTeardownPath?: string;
    projectName?: string;
  }) {
    return defineConfig({
      testDir: options.testDir,
      timeout: envManager.getTimeout(),
      
      expect: {
        timeout: 10000,
      },

      fullyParallel: !envManager.isDevelopment(),
      forbidOnly: !!process.env.CI,
      retries: envManager.isDevelopment() ? 0 : envManager.isProduction() ? 0 : 1,
      workers: process.env.CI ? 2 : envManager.isDevelopment() ? 1 : undefined,

      reporter: [
        ['list'],
        ['html', {
          outputFolder: 'test-results/html-report',
          open: envManager.isDevelopment() ? 'always' : 'never',
        }],
        ['junit', {
          outputFile: 'test-results/junit-report.xml',
        }],
        ['json', {
          outputFile: 'test-results/test-results.json',
        }],
      ],

      use: {
        baseURL: envManager.getBaseUrl(),
        headless: envManager.isHeadless(),
        trace: envManager.shouldEnableTrace() ? 'on-first-retry' : 'off',
        screenshot: envManager.shouldEnableScreenshots() ? 'only-on-failure' : 'off',
        video: envManager.shouldEnableVideo() ? 'retain-on-failure' : 'off',
        actionTimeout: 15000,
        navigationTimeout: 30000,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        locale: 'en-GB',
        timezoneId: 'Europe/London',
        colorScheme: 'light',
        extraHTTPHeaders: {
          'Accept-Language': 'en-GB,en;q=0.9',
        },
        permissions: ['geolocation'],
        geolocation: { latitude: 51.5074, longitude: -0.1278 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },

      projects: [this.getBrowserProject()],

      outputDir: 'test-results/artifacts',

      globalSetup: envManager.isDevelopment() ? undefined : options.globalSetupPath,
      globalTeardown: envManager.isDevelopment() ? undefined : options.globalTeardownPath,

      metadata: {
        environment: envManager.getCurrentEnvironment(),
        baseUrl: envManager.getBaseUrl(),
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0',
        project: options.projectName || 'default',
      },

      testMatch: ['**/*.spec.ts', '**/*.test.ts'],
      testIgnore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.git/**'],

      maxFailures: envManager.isProduction() ? 10 : undefined,
      preserveOutput: 'failures-only',
      updateSnapshots: 'missing',

      shard: process.env.CI
        ? {
          current: parseInt(process.env.SHARD_INDEX || '1'),
          total: parseInt(process.env.SHARD_TOTAL || '1'),
        }
        : undefined,
    });
  }
}