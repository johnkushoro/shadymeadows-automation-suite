"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.envManager = exports.EnvManager = void 0;
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
/**
 * Professional Environment Manager for UI Automation Framework
 * Self-contained configuration management with no external dependencies
 */
class EnvManager {
    constructor(customConfig) {
        this.supportedBrowsers = [
            'chromium', 'chrome', 'firefox', 'webkit', 'safari', 'edge', 'msedge'
        ];
        this.environmentDefaults = {
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
        this.environment = this.getEnvironment();
        this.loadEnvironmentConfig();
        this.config = this.parseConfig(customConfig);
    }
    /**
     * Get singleton instance with optional custom configuration
     */
    static getInstance(customConfig) {
        if (!EnvManager.instance) {
            EnvManager.instance = new EnvManager(customConfig);
        }
        return EnvManager.instance;
    }
    /**
     * Reset singleton instance (useful for testing or configuration changes)
     */
    static reset() {
        EnvManager.instance = undefined;
    }
    /**
     * Create a new instance with custom configuration (non-singleton)
     */
    static create(customConfig) {
        return new EnvManager(customConfig);
    }
    getEnvironment() {
        const env = process.env.TEST_ENV || process.env.NODE_ENV || 'qa';
        if (env === 'qa' || env === 'production' || env === 'development') {
            return env;
        }
        return 'qa';
    }
    loadEnvironmentConfig() {
        // Try to load environment-specific config file
        const envFile = `.env.${this.environment}`;
        const envPath = path.resolve(process.cwd(), envFile);
        try {
            dotenv.config({ path: envPath });
        }
        catch (error) {
            // Silently continue if env file doesn't exist
        }
        // Also try to load default .env if it exists
        try {
            dotenv.config({ path: path.resolve(process.cwd(), '.env') });
        }
        catch (error) {
            // Silently continue if .env doesn't exist
        }
    }
    parseConfig(customConfig) {
        const defaults = this.environmentDefaults[this.environment];
        // Merge defaults, environment variables, and custom config
        const config = {
            baseUrl: customConfig?.baseUrl || this.getEnvVar('BASE_URL', 'http://localhost:3000'),
            apiUrl: customConfig?.apiUrl || this.getEnvVar('API_URL', ''),
            timeout: customConfig?.timeout || parseInt(this.getEnvVar('TIMEOUT', defaults.timeout.toString())),
            headless: customConfig?.headless !== undefined ? customConfig.headless : this.getEnvVar('HEADLESS', defaults.headless.toString()) === 'true',
            browser: customConfig?.browser || this.validateBrowser(this.getEnvVar('BROWSER', defaults.browser)),
            slowMo: customConfig?.slowMo !== undefined ? customConfig.slowMo : parseInt(this.getEnvVar('SLOW_MO', defaults.slowMo.toString())),
            testUsername: this.getEnvVar('TEST_USERNAME', 'test@example.com'),
            testPassword: this.getEnvVar('TEST_PASSWORD', 'password123'),
            enableScreenshots: customConfig?.enableScreenshots !== undefined ? customConfig.enableScreenshots : this.getEnvVar('ENABLE_SCREENSHOTS', defaults.enableScreenshots.toString()) === 'true',
            enableVideo: customConfig?.enableVideo !== undefined ? customConfig.enableVideo : this.getEnvVar('ENABLE_VIDEO', defaults.enableVideo.toString()) === 'true',
            enableTrace: customConfig?.enableTrace !== undefined ? customConfig.enableTrace : this.getEnvVar('ENABLE_TRACE', defaults.enableTrace.toString()) === 'true',
            retries: customConfig?.retries !== undefined ? customConfig.retries : parseInt(this.getEnvVar('RETRIES', '1')),
            workers: customConfig?.workers !== undefined ? customConfig.workers : parseInt(this.getEnvVar('WORKERS', '1')),
        };
        return config;
    }
    getEnvVar(key, defaultValue) {
        return process.env[key] || defaultValue;
    }
    validateBrowser(browser) {
        const normalizedBrowser = browser.toLowerCase();
        if (this.supportedBrowsers.includes(normalizedBrowser)) {
            return normalizedBrowser;
        }
        console.warn(`Unsupported browser: ${browser}. Supported browsers: ${this.supportedBrowsers.join(', ')}. Falling back to chromium.`);
        return 'chromium';
    }
    // Public getters
    getConfig() {
        return { ...this.config };
    }
    getCurrentEnvironment() {
        return this.environment;
    }
    getBaseUrl() {
        return this.config.baseUrl;
    }
    getApiUrl() {
        return this.config.apiUrl || '';
    }
    getTimeout() {
        return this.config.timeout;
    }
    isHeadless() {
        return this.config.headless;
    }
    getBrowser() {
        return this.config.browser;
    }
    getSlowMo() {
        return this.config.slowMo;
    }
    getTestCredentials() {
        return {
            username: this.config.testUsername,
            password: this.config.testPassword,
        };
    }
    shouldEnableScreenshots() {
        return this.config.enableScreenshots;
    }
    shouldEnableVideo() {
        return this.config.enableVideo;
    }
    shouldEnableTrace() {
        return this.config.enableTrace;
    }
    getRetries() {
        return this.config.retries || 1;
    }
    getWorkers() {
        return this.config.workers || 1;
    }
    // Utility methods
    isDevelopment() {
        return this.environment === 'development';
    }
    isQA() {
        return this.environment === 'qa';
    }
    isProduction() {
        return this.environment === 'production';
    }
    // Get environment-specific defaults for documentation/reference
    getEnvironmentDefaults() {
        return { ...this.environmentDefaults[this.environment] };
    }
    // Get all supported browsers for validation/documentation
    getSupportedBrowsers() {
        return [...this.supportedBrowsers];
    }
    /**
     * Update configuration at runtime
     */
    updateConfig(updates) {
        Object.assign(this.config, updates);
    }
    /**
     * Validate current configuration
     */
    validateConfig() {
        const errors = [];
        if (!this.config.baseUrl) {
            errors.push('Base URL is required');
        }
        if (this.config.timeout < 1000) {
            errors.push('Timeout must be at least 1000ms');
        }
        if (this.config.slowMo < 0) {
            errors.push('SlowMo cannot be negative');
        }
        if (!this.supportedBrowsers.includes(this.config.browser)) {
            errors.push(`Unsupported browser: ${this.config.browser}`);
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
}
exports.EnvManager = EnvManager;
// Export singleton instance for convenience
exports.envManager = EnvManager.getInstance();
//# sourceMappingURL=EnvManager.js.map