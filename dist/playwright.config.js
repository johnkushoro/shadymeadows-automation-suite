"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const EnvManager_1 = require("./config/EnvManager");
/**
 * Reusable Constants & Helpers
 */
const commonDesktopViewport = { width: 1920, height: 1080 };
const commonArgs = [
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
const startMaximizedArgs = ['--start-maximized'];
const getLaunchOptions = (args = commonArgs) => ({
    args,
    slowMo: EnvManager_1.envManager.getSlowMo(),
    timeout: 60000,
});
/**
 * Dynamic browser project configuration based on BROWSER environment variable
 */
const getBrowserProject = () => {
    const browser = EnvManager_1.envManager.getBrowser().toLowerCase();
    switch (browser) {
        case 'chromium':
        case 'chrome':
            return {
                name: 'chromium',
                use: {
                    channel: 'chrome',
                    ...test_1.devices['Desktop Chrome'],
                    viewport: commonDesktopViewport,
                    launchOptions: getLaunchOptions(),
                },
            };
        case 'edge':
        case 'msedge':
            return {
                name: 'edge',
                use: {
                    channel: 'msedge',
                    ...test_1.devices['Desktop Edge'],
                    viewport: commonDesktopViewport,
                    launchOptions: getLaunchOptions(),
                },
            };
        case 'firefox':
            return {
                name: 'firefox',
                use: {
                    ...test_1.devices['Desktop Firefox'],
                    viewport: commonDesktopViewport,
                    launchOptions: {
                        slowMo: EnvManager_1.envManager.getSlowMo(),
                    },
                },
            };
        case 'webkit':
        case 'safari':
            return {
                name: 'webkit',
                use: {
                    ...test_1.devices['Desktop Safari'],
                    viewport: commonDesktopViewport,
                    launchOptions: {
                        slowMo: EnvManager_1.envManager.getSlowMo(),
                    },
                },
            };
        default:
            console.warn(`Unknown browser: ${browser}. Falling back to chromium.`);
            return {
                name: 'chromium',
                use: {
                    channel: 'chrome',
                    ...test_1.devices['Desktop Chrome'],
                    viewport: commonDesktopViewport,
                    launchOptions: getLaunchOptions(),
                },
            };
    }
};
/**
 * Enhanced Playwright Configuration
 * Supports multiple environments with professional settings
 * @see https://playwright.dev/docs/test-configuration
 */
exports.default = (0, test_1.defineConfig)({
    testDir: './tests',
    timeout: EnvManager_1.envManager.getTimeout(),
    expect: {
        timeout: 10000,
    },
    fullyParallel: !EnvManager_1.envManager.isDevelopment(),
    forbidOnly: !!process.env.CI,
    retries: EnvManager_1.envManager.isDevelopment() ? 0 : EnvManager_1.envManager.isProduction() ? 0 : 1,
    workers: process.env.CI ? 2 : EnvManager_1.envManager.isDevelopment() ? 1 : undefined,
    reporter: [
        ['list'],
        ['html', {
                outputFolder: 'test-results/html-report',
                open: EnvManager_1.envManager.isDevelopment() ? 'always' : 'never',
            }],
        ['junit', {
                outputFile: 'test-results/junit-report.xml',
            }],
        ['json', {
                outputFile: 'test-results/test-results.json',
            }],
        // ['allure-playwright', {
        //   detail: true,
        //   outputFolder: 'test-results/allure-results'
        // }],
    ],
    use: {
        baseURL: EnvManager_1.envManager.getBaseUrl(),
        headless: EnvManager_1.envManager.isHeadless(),
        trace: EnvManager_1.envManager.shouldEnableTrace() ? 'on-first-retry' : 'off',
        screenshot: EnvManager_1.envManager.shouldEnableScreenshots() ? 'only-on-failure' : 'off',
        video: EnvManager_1.envManager.shouldEnableVideo() ? 'retain-on-failure' : 'off',
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
    projects: [
        // Dynamic browser selection based on BROWSER environment variable
        getBrowserProject(),
        // Additional specialized projects (uncomment as needed)
        // {
        //   name: 'mobile-chrome',
        //   use: {
        //     ...devices['Pixel 5'],
        //     launchOptions: {
        //       slowMo: envManager.getSlowMo(),
        //     },
        //   },
        // },
        // {
        //   name: 'mobile-safari',
        //   use: {
        //     ...devices['iPhone 12'],
        //     launchOptions: {
        //       slowMo: envManager.getSlowMo(),
        //     },
        //   },
        // },
        // {
        //   name: 'tablet',
        //   use: {
        //     ...devices['iPad Pro'],
        //     launchOptions: {
        //       slowMo: envManager.getSlowMo(),
        //     },
        //   },
        // },
        // {
        //   name: 'high-dpi',
        //   use: {
        //     ...devices['Desktop Chrome'],
        //     viewport: commonDesktopViewport,
        //     deviceScaleFactor: 2,
        //     launchOptions: getLaunchOptions([
        //       ...startMaximizedArgs,
        //       '--force-device-scale-factor=2',
        //     ]),
        //   },
        // },
        // {
        //   name: 'accessibility',
        //   use: {
        //     ...devices['Desktop Chrome'],
        //     viewport: commonDesktopViewport,
        //     launchOptions: getLaunchOptions([
        //       '--start-maximized',
        //       '--force-prefers-reduced-motion',
        //       '--force-prefers-color-scheme=light',
        //     ]),
        //   },
        // },
    ],
    outputDir: 'test-results/artifacts',
    globalSetup: EnvManager_1.envManager.isDevelopment() ? undefined : require.resolve('./core/global-setup'),
    globalTeardown: EnvManager_1.envManager.isDevelopment() ? undefined : require.resolve('./core/global-teardown'),
    metadata: {
        environment: EnvManager_1.envManager.getCurrentEnvironment(),
        baseUrl: EnvManager_1.envManager.getBaseUrl(),
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0',
    },
    testMatch: ['**/*.spec.ts', '**/*.test.ts'],
    testIgnore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.git/**'],
    maxFailures: EnvManager_1.envManager.isProduction() ? 10 : undefined,
    preserveOutput: 'failures-only',
    updateSnapshots: 'missing',
    shard: process.env.CI
        ? {
            current: parseInt(process.env.SHARD_INDEX || '1'),
            total: parseInt(process.env.SHARD_TOTAL || '1'),
        }
        : undefined,
});
// Environment-specific configurations are now handled in global-setup.ts
// to prevent duplicate logging when running tests
//# sourceMappingURL=playwright.config.js.map