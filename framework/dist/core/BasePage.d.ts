import { Page, Locator } from '@playwright/test';
import { ActionHelper } from '../helpers/ActionHelper';
import { WaitHelper } from '../helpers/WaitHelper';
import { LocatorHelper } from '../helpers/LocatorHelper';
import { AssertionHelper } from '../helpers/AssertionHelper';
import { ElementHelper } from '../helpers/ElementHelper';
import { FrameworkConfig, ScreenshotOptions } from '../types';
/**
 * Professional BasePage class with comprehensive functionality
 * Self-contained with configurable options and no external dependencies
 * Follows the Page Object Model pattern with helper composition
 */
export declare abstract class BasePage {
    protected readonly page: Page;
    protected readonly actionHelper: ActionHelper;
    protected readonly waitHelper: WaitHelper;
    protected readonly locatorHelper: LocatorHelper;
    protected readonly assertionHelper: AssertionHelper;
    protected readonly elementHelper: typeof ElementHelper;
    protected readonly config: Partial<FrameworkConfig>;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Navigate to the page's URL
     * Should be implemented by each page class
     */
    abstract navigate(): Promise<void>;
    /**
     * Wait for the page to be loaded
     * Should be implemented by each page class to wait for key elements
     */
    abstract waitForPageLoad(): Promise<void>;
    /**
     * Verify that we're on the correct page
     * Should be implemented by each page class
     */
    abstract isPageLoaded(): Promise<boolean>;
    /**
     * Get the page instance
     */
    getPage(): Page;
    /**
     * Get the base URL
     */
    getBaseUrl(): string;
    /**
     * Navigate to a specific URL
     */
    navigateToUrl(url: string): Promise<void>;
    /**
     * Navigate to a relative path from base URL
     */
    navigateToPath(path: string): Promise<void>;
    /**
     * Get current URL
     */
    getCurrentUrl(): string;
    /**
     * Get page title
     */
    getPageTitle(): Promise<string>;
    /**
     * Take a screenshot
     */
    takeScreenshot(options?: ScreenshotOptions): Promise<Buffer>;
    /**
     * Take element screenshot
     */
    takeElementScreenshot(locator: Locator, options?: ScreenshotOptions): Promise<Buffer>;
    /**
     * Wait for network to be idle
     */
    waitForNetworkIdle(): Promise<void>;
    /**
     * Wait for DOM content to be loaded
     */
    waitForDOMContentLoaded(): Promise<void>;
    /**
     * Reload the page
     */
    reload(): Promise<void>;
    /**
     * Go back in browser history
     */
    goBack(): Promise<void>;
    /**
     * Go forward in browser history
     */
    goForward(): Promise<void>;
    /**
     * Execute JavaScript in the page context
     */
    executeScript<T>(script: string, ...args: any[]): Promise<T>;
    /**
     * Execute JavaScript function in the page context
     */
    executeFunction<T>(fn: (...args: any[]) => T, ...args: any[]): Promise<T>;
    /**
     * Clear browser storage
     */
    clearStorage(): Promise<void>;
    /**
     * Set viewport size
     */
    setViewportSize(width: number, height: number): Promise<void>;
    /**
     * Get viewport size
     */
    getViewportSize(): Promise<{
        width: number;
        height: number;
    }>;
    /**
     * Set extra HTTP headers
     */
    setExtraHTTPHeaders(headers: Record<string, string>): Promise<void>;
    /**
     * Get all locators for common elements that might exist on any page
     */
    protected getCommonLocators(): {
        loadingSpinner: Locator;
        errorMessage: Locator;
        successMessage: Locator;
        modal: Locator;
        closeButton: Locator;
        overlay: Locator;
        notification: Locator;
        confirmButton: Locator;
        cancelButton: Locator;
    };
    /**
     * Wait for loading to complete
     */
    waitForLoadingToComplete(timeout?: number): Promise<void>;
    /**
     * Close any open modals
     */
    closeModal(): Promise<void>;
    /**
     * Close any open overlays
     */
    closeOverlay(): Promise<void>;
    /**
     * Wait for and dismiss notifications
     */
    dismissNotifications(): Promise<void>;
    /**
     * Get error message text if visible
     */
    getErrorMessage(): Promise<string | null>;
    /**
     * Get success message text if visible
     */
    getSuccessMessage(): Promise<string | null>;
    /**
     * Check if page has any error messages
     */
    hasErrorMessage(): Promise<boolean>;
    /**
     * Check if page has any success messages
     */
    hasSuccessMessage(): Promise<boolean>;
    /**
     * Wait for page to be ready (DOM loaded, no loading spinners)
     */
    waitForPageReady(): Promise<void>;
    /**
     * Scroll to top of page
     */
    scrollToTop(): Promise<void>;
    /**
     * Scroll to bottom of page
     */
    scrollToBottom(): Promise<void>;
    /**
     * Scroll element into view
     */
    scrollElementIntoView(locator: Locator): Promise<void>;
    /**
     * Highlight element for debugging
     */
    highlightElement(locator: Locator, color?: string): Promise<void>;
    /**
     * Remove highlight from element
     */
    removeHighlight(locator: Locator): Promise<void>;
    /**
     * Wait for URL to change
     */
    waitForUrlChange(originalUrl?: string, timeout?: number): Promise<void>;
    /**
     * Wait for URL to contain specific text
     */
    waitForUrlToContain(text: string, timeout?: number): Promise<void>;
    /**
     * Check if current URL contains specific text
     */
    urlContains(text: string): boolean;
    /**
     * Check if current URL matches pattern
     */
    urlMatches(pattern: RegExp): boolean;
    /**
     * Get page performance metrics
     */
    getPerformanceMetrics(): Promise<any>;
    /**
     * Update configuration at runtime
     */
    updateConfig(updates: Partial<FrameworkConfig>): void;
    /**
     * Get current configuration
     */
    getConfig(): Partial<FrameworkConfig>;
    /**
     * Add custom CSS to page
     */
    addCustomCSS(css: string): Promise<void>;
    /**
     * Add custom JavaScript to page
     */
    addCustomJS(script: string): Promise<void>;
    /**
     * Wait for console message
     */
    waitForConsoleMessage(predicate?: (message: any) => boolean, timeout?: number): Promise<any>;
    /**
     * Get all console messages
     */
    getConsoleMessages(): any[];
    /**
     * Check if page is responsive (mobile-friendly)
     */
    checkResponsiveness(): Promise<{
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    }>;
}
//# sourceMappingURL=BasePage.d.ts.map