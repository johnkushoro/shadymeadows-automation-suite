"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
const ActionHelper_1 = require("../helpers/ActionHelper");
const WaitHelper_1 = require("../helpers/WaitHelper");
const LocatorHelper_1 = require("../helpers/LocatorHelper");
const AssertionHelper_1 = require("../helpers/AssertionHelper");
const ElementHelper_1 = require("../helpers/ElementHelper");
/**
 * Professional BasePage class with comprehensive functionality
 * Self-contained with configurable options and no external dependencies
 * Follows the Page Object Model pattern with helper composition
 */
class BasePage {
    constructor(page, config = {}) {
        this.page = page;
        this.config = {
            baseUrl: 'http://localhost:3000',
            timeout: 30000,
            slowMo: 0,
            ...config
        };
        // Initialize helpers with shared configuration
        this.actionHelper = new ActionHelper_1.ActionHelper(page, this.config);
        this.waitHelper = new WaitHelper_1.WaitHelper(page, this.config);
        this.locatorHelper = new LocatorHelper_1.LocatorHelper(page);
        this.assertionHelper = new AssertionHelper_1.AssertionHelper(page, this.config);
        this.elementHelper = ElementHelper_1.ElementHelper;
    }
    /**
     * Get the page instance
     */
    getPage() {
        return this.page;
    }
    /**
     * Get the base URL
     */
    getBaseUrl() {
        return this.config.baseUrl || 'http://localhost:3000';
    }
    /**
     * Navigate to a specific URL
     */
    async navigateToUrl(url) {
        await this.page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: this.config.timeout
        });
    }
    /**
     * Navigate to a relative path from base URL
     */
    async navigateToPath(path) {
        const fullUrl = `${this.getBaseUrl()}${path}`;
        await this.navigateToUrl(fullUrl);
    }
    /**
     * Get current URL
     */
    getCurrentUrl() {
        return this.page.url();
    }
    /**
     * Get page title
     */
    async getPageTitle() {
        return await this.page.title();
    }
    /**
     * Take a screenshot
     */
    async takeScreenshot(options = {}) {
        const screenshotName = options.path || `screenshot-${Date.now()}.png`;
        return await this.page.screenshot({
            fullPage: options.fullPage !== false,
            path: screenshotName,
            clip: options.clip
        });
    }
    /**
     * Take element screenshot
     */
    async takeElementScreenshot(locator, options = {}) {
        const screenshotName = options.path || `element-screenshot-${Date.now()}.png`;
        return await locator.screenshot({
            path: screenshotName
        });
    }
    /**
     * Wait for network to be idle
     */
    async waitForNetworkIdle() {
        await this.page.waitForLoadState('networkidle', {
            timeout: this.config.timeout
        });
    }
    /**
     * Wait for DOM content to be loaded
     */
    async waitForDOMContentLoaded() {
        await this.page.waitForLoadState('domcontentloaded', {
            timeout: this.config.timeout
        });
    }
    /**
     * Reload the page
     */
    async reload() {
        await this.page.reload({
            waitUntil: 'domcontentloaded',
            timeout: this.config.timeout
        });
    }
    /**
     * Go back in browser history
     */
    async goBack() {
        await this.page.goBack({
            waitUntil: 'domcontentloaded',
            timeout: this.config.timeout
        });
    }
    /**
     * Go forward in browser history
     */
    async goForward() {
        await this.page.goForward({
            waitUntil: 'domcontentloaded',
            timeout: this.config.timeout
        });
    }
    /**
     * Execute JavaScript in the page context
     */
    async executeScript(script, ...args) {
        return await this.page.evaluate(script, ...args);
    }
    /**
     * Execute JavaScript function in the page context
     */
    async executeFunction(fn, ...args) {
        return await this.page.evaluate(fn, ...args);
    }
    /**
     * Clear browser storage
     */
    async clearStorage() {
        await this.page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
        });
        await this.page.context().clearCookies();
    }
    /**
     * Set viewport size
     */
    async setViewportSize(width, height) {
        await this.page.setViewportSize({ width, height });
    }
    /**
     * Get viewport size
     */
    async getViewportSize() {
        return this.page.viewportSize() || { width: 1280, height: 720 };
    }
    /**
     * Set extra HTTP headers
     */
    async setExtraHTTPHeaders(headers) {
        await this.page.setExtraHTTPHeaders(headers);
    }
    /**
     * Get all locators for common elements that might exist on any page
     */
    getCommonLocators() {
        return {
            loadingSpinner: this.locatorHelper.getLocator('[data-testid="loading-spinner"], .loading, .spinner'),
            errorMessage: this.locatorHelper.getLocator('[data-testid="error-message"], .error, .alert-error'),
            successMessage: this.locatorHelper.getLocator('[data-testid="success-message"], .success, .alert-success'),
            modal: this.locatorHelper.getLocator('[data-testid="modal"], .modal, .dialog'),
            closeButton: this.locatorHelper.getLocator('[data-testid="close-button"], .close, .btn-close'),
            overlay: this.locatorHelper.getLocator('[data-testid="overlay"], .overlay, .backdrop'),
            notification: this.locatorHelper.getLocator('[data-testid="notification"], .notification, .toast'),
            confirmButton: this.locatorHelper.getLocator('[data-testid="confirm-button"], .confirm, .btn-confirm'),
            cancelButton: this.locatorHelper.getLocator('[data-testid="cancel-button"], .cancel, .btn-cancel'),
        };
    }
    /**
     * Wait for loading to complete
     */
    async waitForLoadingToComplete(timeout) {
        const { loadingSpinner } = this.getCommonLocators();
        try {
            await this.waitHelper.waitForElementToBeHidden(loadingSpinner, timeout);
        }
        catch (error) {
            // Loading spinner might not exist, which is fine
        }
    }
    /**
     * Close any open modals
     */
    async closeModal() {
        const { modal, closeButton } = this.getCommonLocators();
        if (await modal.isVisible()) {
            await this.actionHelper.clickLocator(closeButton);
            await this.waitHelper.waitForElementToBeHidden(modal);
        }
    }
    /**
     * Close any open overlays
     */
    async closeOverlay() {
        const { overlay } = this.getCommonLocators();
        if (await overlay.isVisible()) {
            await this.actionHelper.clickLocator(overlay);
            await this.waitHelper.waitForElementToBeHidden(overlay);
        }
    }
    /**
     * Wait for and dismiss notifications
     */
    async dismissNotifications() {
        const { notification } = this.getCommonLocators();
        const notifications = await notification.all();
        for (const notif of notifications) {
            if (await notif.isVisible()) {
                const closeBtn = notif.locator('.close, .dismiss, [data-testid="close"]');
                if (await closeBtn.isVisible()) {
                    await this.actionHelper.clickLocator(closeBtn);
                }
            }
        }
    }
    /**
     * Get error message text if visible
     */
    async getErrorMessage() {
        const { errorMessage } = this.getCommonLocators();
        if (await errorMessage.isVisible()) {
            return await this.elementHelper.getTrimmedText(errorMessage);
        }
        return null;
    }
    /**
     * Get success message text if visible
     */
    async getSuccessMessage() {
        const { successMessage } = this.getCommonLocators();
        if (await successMessage.isVisible()) {
            return await this.elementHelper.getTrimmedText(successMessage);
        }
        return null;
    }
    /**
     * Check if page has any error messages
     */
    async hasErrorMessage() {
        const { errorMessage } = this.getCommonLocators();
        return await errorMessage.isVisible();
    }
    /**
     * Check if page has any success messages
     */
    async hasSuccessMessage() {
        const { successMessage } = this.getCommonLocators();
        return await successMessage.isVisible();
    }
    /**
     * Wait for page to be ready (DOM loaded, no loading spinners)
     */
    async waitForPageReady() {
        await this.waitForDOMContentLoaded();
        await this.waitForLoadingToComplete();
    }
    /**
     * Scroll to top of page
     */
    async scrollToTop() {
        await this.actionHelper.scrollToTop();
    }
    /**
     * Scroll to bottom of page
     */
    async scrollToBottom() {
        await this.actionHelper.scrollToBottom();
    }
    /**
     * Scroll element into view
     */
    async scrollElementIntoView(locator) {
        await locator.scrollIntoViewIfNeeded();
    }
    /**
     * Highlight element for debugging
     */
    async highlightElement(locator, color = 'red') {
        await this.elementHelper.highlightElement(locator, color);
    }
    /**
     * Remove highlight from element
     */
    async removeHighlight(locator) {
        await this.elementHelper.removeHighlight(locator);
    }
    /**
     * Wait for URL to change
     */
    async waitForUrlChange(originalUrl, timeout) {
        const currentUrl = originalUrl || this.getCurrentUrl();
        await this.waitHelper.waitForUrlToChangeFrom(currentUrl, timeout);
    }
    /**
     * Wait for URL to contain specific text
     */
    async waitForUrlToContain(text, timeout) {
        await this.waitHelper.waitForUrlToMatch(new RegExp(text), timeout);
    }
    /**
     * Check if current URL contains specific text
     */
    urlContains(text) {
        return this.getCurrentUrl().includes(text);
    }
    /**
     * Check if current URL matches pattern
     */
    urlMatches(pattern) {
        return pattern.test(this.getCurrentUrl());
    }
    /**
     * Get page performance metrics
     */
    async getPerformanceMetrics() {
        return await this.page.evaluate(() => {
            const navigation = performance.getEntriesByType('navigation')[0];
            return {
                domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
                firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
                firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
            };
        });
    }
    /**
     * Update configuration at runtime
     */
    updateConfig(updates) {
        Object.assign(this.config, updates);
        this.actionHelper.updateConfig(updates);
        this.waitHelper.updateConfig(updates);
        this.assertionHelper.updateConfig(updates);
    }
    /**
     * Get current configuration
     */
    getConfig() {
        return { ...this.config };
    }
    /**
     * Add custom CSS to page
     */
    async addCustomCSS(css) {
        await this.page.addStyleTag({ content: css });
    }
    /**
     * Add custom JavaScript to page
     */
    async addCustomJS(script) {
        await this.page.addScriptTag({ content: script });
    }
    /**
     * Wait for console message
     */
    async waitForConsoleMessage(predicate, timeout) {
        return await this.waitHelper.waitForConsoleMessage(predicate, timeout);
    }
    /**
     * Get all console messages
     */
    getConsoleMessages() {
        const messages = [];
        this.page.on('console', msg => messages.push(msg));
        return messages;
    }
    /**
     * Check if page is responsive (mobile-friendly)
     */
    async checkResponsiveness() {
        const originalSize = await this.getViewportSize();
        // Test mobile
        await this.setViewportSize(375, 667);
        const mobileReady = await this.isPageLoaded();
        // Test tablet
        await this.setViewportSize(768, 1024);
        const tabletReady = await this.isPageLoaded();
        // Test desktop
        await this.setViewportSize(1920, 1080);
        const desktopReady = await this.isPageLoaded();
        // Restore original size
        await this.setViewportSize(originalSize.width, originalSize.height);
        return {
            mobile: mobileReady,
            tablet: tabletReady,
            desktop: desktopReady
        };
    }
}
exports.BasePage = BasePage;
//# sourceMappingURL=BasePage.js.map