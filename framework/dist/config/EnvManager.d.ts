import { Environment, SupportedBrowser, EnvironmentConfig, EnvironmentDefaults, FrameworkConfig, TestCredentials } from '../types';
/**
 * Professional Environment Manager for UI Automation Framework
 * Self-contained configuration management with no external dependencies
 */
export declare class EnvManager {
    private static instance;
    private readonly config;
    private readonly environment;
    private readonly supportedBrowsers;
    private readonly environmentDefaults;
    private constructor();
    /**
     * Get singleton instance with optional custom configuration
     */
    static getInstance(customConfig?: Partial<FrameworkConfig>): EnvManager;
    /**
     * Reset singleton instance (useful for testing or configuration changes)
     */
    static reset(): void;
    /**
     * Create a new instance with custom configuration (non-singleton)
     */
    static create(customConfig: Partial<FrameworkConfig>): EnvManager;
    private getEnvironment;
    private loadEnvironmentConfig;
    private parseConfig;
    private getEnvVar;
    private validateBrowser;
    getConfig(): EnvironmentConfig;
    getCurrentEnvironment(): Environment;
    getBaseUrl(): string;
    getApiUrl(): string;
    getTimeout(): number;
    isHeadless(): boolean;
    getBrowser(): SupportedBrowser;
    getSlowMo(): number;
    getTestCredentials(): TestCredentials;
    shouldEnableScreenshots(): boolean;
    shouldEnableVideo(): boolean;
    shouldEnableTrace(): boolean;
    getRetries(): number;
    getWorkers(): number;
    isDevelopment(): boolean;
    isQA(): boolean;
    isProduction(): boolean;
    getEnvironmentDefaults(): EnvironmentDefaults;
    getSupportedBrowsers(): SupportedBrowser[];
    /**
     * Update configuration at runtime
     */
    updateConfig(updates: Partial<FrameworkConfig>): void;
    /**
     * Validate current configuration
     */
    validateConfig(): {
        isValid: boolean;
        errors: string[];
    };
}
export declare const envManager: EnvManager;
//# sourceMappingURL=EnvManager.d.ts.map