// Type exports (must be first)
export type * from './types';

// Core exports
export { BasePage } from './core/BasePage';

// Helper exports
export { ActionHelper } from './helpers/ActionHelper';
export { ApiHelper } from './helpers/ApiHelper';
export { AssertionHelper } from './helpers/AssertionHelper';
export { AuthenticationHelper } from './helpers/AuthenticationHelper';
export { ElementHelper } from './helpers/ElementHelper';
export { LocatorHelper } from './helpers/LocatorHelper';
export { UIComponentsHelper } from './helpers/UIComponentsHelper';
export { WaitHelper } from './helpers/WaitHelper';

// Config exports
export { EnvManager, envManager } from './config/EnvManager';
export { PlaywrightConfigBuilder } from './config/PlaywrightConfigBuilder';

// Utility exports
export { TestDataGenerator } from './utils/TestDataGenerator';
export { UITestUtils } from './utils/UITestUtils';

// Re-export Playwright types for convenience
export type { Page, Locator, Browser, BrowserContext } from '@playwright/test';
export { expect } from '@playwright/test';