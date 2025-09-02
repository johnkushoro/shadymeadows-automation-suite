import * as dotenv from 'dotenv';
import * as path from 'path';
import {
  Environment,
  EnvironmentConfig,
  EnvironmentDefaults,
  FrameworkConfig,
  SupportedBrowser,
  TestCredentials
} from '../types';

/**
 * Professional Environment Manager for UI Automation Framework
 * Self-contained configuration management with no external dependencies
 */
export class EnvManager {
  private static instance: EnvManager;
  private readonly config: EnvironmentConfig;
  private readonly environment: Environment;
  private readonly supportedBrowsers: SupportedBrowser[] = [
    'chromium', 'chrome', 'firefox', 'webkit', 'safari', 'edge', 'msedge'
  ];

  private readonly environmentDefaults: Record<Environment, EnvironmentDefaults> = {
    development: {
      timeout: 30000,
      headless: false,
      browser: 'chromium',
      slowMo: 0,
      enableScreenshots: true,
      enableVideo: true,
      enableTrace: true,
    },
    qa: {
      timeout: 45000,
      headless: false,
      browser: 'chromium',
      slowMo: 100,
      enableScreenshots: true,
      enableVideo: true,
      enableTrace: true,
    },
    production: {
      timeout: 60000,
      headless: true,
      browser: 'chromium',
      slowMo: 0,
      enableScreenshots: false,
      enableVideo: false,
      enableTrace: false,
    },
  };

  private constructor(customConfig?: Partial<FrameworkConfig>) {
    this.environment = this.getEnvironment();
    this.loadEnvironmentConfig();
    this.config = this.parseConfig(customConfig);
  }

  /**
   * Get singleton instance with optional custom configuration
   */
  public static getInstance(customConfig?: Partial<FrameworkConfig>): EnvManager {
    if (!EnvManager.instance) {
      EnvManager.instance = new EnvManager(customConfig);
    }
    return EnvManager.instance;
  }

  /**
   * Reset singleton instance (useful for testing or configuration changes)
   */
  public static reset(): void {
    EnvManager.instance = undefined as any;
  }

  /**
   * Create a new instance with custom configuration (non-singleton)
   */
  public static create(customConfig: Partial<FrameworkConfig>): EnvManager {
    return new EnvManager(customConfig);
  }

  private getEnvironment(): Environment {
    const env = process.env.TEST_ENV || process.env.NODE_ENV || 'qa';
    if (env === 'qa' || env === 'production' || env === 'development') {
      return env as Environment;
    }
    return 'qa';
  }

  private loadEnvironmentConfig(): void {
    // Try to load environment-specific config file from multiple possible locations
    const envFile = `.env.${this.environment}`;
    const possiblePaths = [
      // First try the environments subdirectory from current working directory
      path.resolve(process.cwd(), 'environments', envFile),
      // Then try the current working directory
      path.resolve(process.cwd(), envFile),
      // Then try the projects/gateway-ui/environments directory from root
      path.resolve(process.cwd(), 'projects', 'gateway-ui', 'environments', envFile),
      // Also try relative to the framework directory
      path.resolve(__dirname, '..', '..', '..', 'projects', 'gateway-ui', 'environments', envFile),
      // Try going up one level and then into environments
      path.resolve(process.cwd(), '..', 'projects', 'gateway-ui', 'environments', envFile)
    ];

    let configLoaded = false;
    for (const envPath of possiblePaths) {
      try {
        dotenv.config({ path: envPath });
        console.log(`Loaded environment config from: ${envPath}`);
        configLoaded = true;
        break;
      } catch (error) {
        // Continue to next path
      }
    }

    if (!configLoaded) {
      console.warn(`Could not find environment file .env.${this.environment} in any of the expected locations`);
    }

    // Also try to load default .env if it exists
    const defaultEnvPaths = [
      path.resolve(process.cwd(), '.env'),
      path.resolve(process.cwd(), 'projects', 'gateway-ui', 'environments', '.env')
    ];

    for (const envPath of defaultEnvPaths) {
      try {
        dotenv.config({ path: envPath });
        break;
      } catch (error) {
        // Continue to next path
      }
    }
  }

  private parseConfig(customConfig?: Partial<FrameworkConfig>): EnvironmentConfig {
    const defaults = this.environmentDefaults[this.environment];

    // Merge defaults, environment variables, and custom config


    return {
      baseUrl: customConfig?.baseUrl || this.getEnvVar('BASE_URL', 'http://localhost:3000'),
      apiUrl: customConfig?.apiUrl || this.getEnvVar('API_URL', ''),
      timeout:
        customConfig?.timeout || parseInt(this.getEnvVar('TIMEOUT', defaults.timeout.toString())),
      headless:
        customConfig?.headless !== undefined
          ? customConfig.headless
          : this.getEnvVar('HEADLESS', defaults.headless.toString()) === 'true',
      browser:
        customConfig?.browser || this.validateBrowser(this.getEnvVar('BROWSER', defaults.browser)),
      slowMo:
        customConfig?.slowMo !== undefined
          ? customConfig.slowMo
          : parseInt(this.getEnvVar('SLOW_MO', defaults.slowMo.toString())),
      testUsername: this.getEnvVar('TEST_USERNAME', 'test@example.com'),
      testPassword: this.getEnvVar('TEST_PASSWORD', 'password123'),
      enableScreenshots:
        customConfig?.enableScreenshots !== undefined
          ? customConfig.enableScreenshots
          : this.getEnvVar('ENABLE_SCREENSHOTS', defaults.enableScreenshots.toString()) === 'true',
      enableVideo:
        customConfig?.enableVideo !== undefined
          ? customConfig.enableVideo
          : this.getEnvVar('ENABLE_VIDEO', defaults.enableVideo.toString()) === 'true',
      enableTrace:
        customConfig?.enableTrace !== undefined
          ? customConfig.enableTrace
          : this.getEnvVar('ENABLE_TRACE', defaults.enableTrace.toString()) === 'true',
      retries:
        customConfig?.retries !== undefined
          ? customConfig.retries
          : parseInt(this.getEnvVar('RETRIES', '1')),
      workers:
        customConfig?.workers !== undefined
          ? customConfig.workers
          : parseInt(this.getEnvVar('WORKERS', '1')),
    };
  }

  private getEnvVar(key: string, defaultValue: string): string {
    return process.env[key] || defaultValue;
  }

  private validateBrowser(browser: string): SupportedBrowser {
    const normalizedBrowser = browser.toLowerCase() as SupportedBrowser;

    if (this.supportedBrowsers.includes(normalizedBrowser)) {
      return normalizedBrowser;
    }

    console.warn(`Unsupported browser: ${browser}. Supported browsers: ${this.supportedBrowsers.join(', ')}. Falling back to chromium.`);
    return 'chromium';
  }

  // Public getters
  public getConfig(): EnvironmentConfig {
    return { ...this.config };
  }

  public getCurrentEnvironment(): Environment {
    return this.environment;
  }

  public getBaseUrl(): string {
    return this.config.baseUrl;
  }

  public getApiUrl(): string {
    return this.config.apiUrl || '';
  }

  public getTimeout(): number {
    return this.config.timeout;
  }

  public isHeadless(): boolean {
    return this.config.headless;
  }

  public getBrowser(): SupportedBrowser {
    return this.config.browser as SupportedBrowser;
  }

  public getSlowMo(): number {
    return this.config.slowMo;
  }

  public getTestCredentials(): TestCredentials {
    return {
      username: this.config.testUsername,
      password: this.config.testPassword,
    };
  }

  public shouldEnableScreenshots(): boolean {
    return this.config.enableScreenshots;
  }

  public shouldEnableVideo(): boolean {
    return this.config.enableVideo;
  }

  public shouldEnableTrace(): boolean {
    return this.config.enableTrace;
  }

  public getRetries(): number {
    return this.config.retries || 1;
  }

  public getWorkers(): number {
    return this.config.workers || 1;
  }

  // Utility methods
  public isDevelopment(): boolean {
    return this.environment === 'development';
  }

  public isQA(): boolean {
    return this.environment === 'qa';
  }

  public isProduction(): boolean {
    return this.environment === 'production';
  }

  // Get environment-specific defaults for documentation/reference
  public getEnvironmentDefaults(): EnvironmentDefaults {
    return { ...this.environmentDefaults[this.environment] };
  }

  // Get all supported browsers for validation/documentation
  public getSupportedBrowsers(): SupportedBrowser[] {
    return [...this.supportedBrowsers];
  }

  /**
   * Update configuration at runtime
   */
  public updateConfig(updates: Partial<FrameworkConfig>): void {
    Object.assign(this.config, updates);
  }

  /**
   * Validate current configuration
   */
  public validateConfig(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.config.baseUrl) {
      errors.push('Base URL is required');
    }

    if (this.config.timeout < 1000) {
      errors.push('Timeout must be at least 1000ms');
    }

    if (this.config.slowMo < 0) {
      errors.push('SlowMo cannot be negative');
    }

    if (!this.supportedBrowsers.includes(this.config.browser as SupportedBrowser)) {
      errors.push(`Unsupported browser: ${this.config.browser}`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Export singleton instance for convenience
export const envManager = EnvManager.getInstance();