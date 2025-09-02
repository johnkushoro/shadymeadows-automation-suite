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
export abstract class BasePage {
  protected readonly page: Page;
  protected readonly actionHelper: ActionHelper;
  protected readonly waitHelper: WaitHelper;
  protected readonly locatorHelper: LocatorHelper;
  protected readonly assertionHelper: AssertionHelper;
  protected readonly elementHelper: typeof ElementHelper;
  protected readonly config: Partial<FrameworkConfig>;

  protected constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
    this.page = page;
    // Import EnvManager to get proper configuration
    const { EnvManager } = require('../config/EnvManager');
    const envManager = EnvManager.getInstance();
    
    this.config = {
      baseUrl: envManager.getBaseUrl(),
      timeout: envManager.getTimeout(),
      slowMo: envManager.getSlowMo(),
      ...config
    };
    
    // Initialize helpers with shared configuration
    this.actionHelper = new ActionHelper(page, this.config);
    this.waitHelper = new WaitHelper(page, this.config);
    this.locatorHelper = new LocatorHelper(page);
    this.assertionHelper = new AssertionHelper(page, this.config);
    this.elementHelper = ElementHelper;
  }

  /**
   * Navigate to the page's URL
   * Should be implemented by each page class
   */
  public abstract navigate(): Promise<void>;

  /**
   * Wait for the page to be loaded
   * Should be implemented by each page class to wait for key elements
   */
  public abstract waitForPageLoad(): Promise<void>;

  /**
   * Verify that we're on the correct page
   * Should be implemented by each page class
   */
  public abstract isPageLoaded(): Promise<boolean>;

  /**
   * Get the page instance
   */
  public getPage(): Page {
    return this.page;
  }

  /**
   * Get the base URL
   */
  public getBaseUrl(): string {
    const { EnvManager } = require('../config/EnvManager');
    const envManager = EnvManager.getInstance();
    return this.config.baseUrl || envManager.getBaseUrl();
  }

  /**
   * Navigate to a specific URL
   */
  public async navigateToUrl(url: string): Promise<void> {
    await this.page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: this.config.timeout 
    });
  }

  /**
   * Navigate to a relative path from base URL
   */
  public async navigateToPath(path: string): Promise<void> {
    const fullUrl = `${this.getBaseUrl()}${path}`;
    await this.navigateToUrl(fullUrl);
  }

  /**
   * Get current URL
   */
  public getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Get page title
   */
  public async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Take a screenshot
   */
  public async takeScreenshot(options: ScreenshotOptions = {}): Promise<Buffer> {
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
  public async takeElementScreenshot(locator: Locator, options: ScreenshotOptions = {}): Promise<Buffer> {
    const screenshotName = options.path || `element-screenshot-${Date.now()}.png`;
    return await locator.screenshot({
      path: screenshotName
    });
  }

  /**
   * Wait for network to be idle
   */
  public async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle', { 
      timeout: this.config.timeout 
    });
  }

  /**
   * Wait for DOM content to be loaded
   */
  public async waitForDOMContentLoaded(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded', { 
      timeout: this.config.timeout 
    });
  }

  /**
   * Reload the page
   */
  public async reload(): Promise<void> {
    await this.page.reload({ 
      waitUntil: 'domcontentloaded',
      timeout: this.config.timeout 
    });
  }

  /**
   * Go back in browser history
   */
  public async goBack(): Promise<void> {
    await this.page.goBack({ 
      waitUntil: 'domcontentloaded',
      timeout: this.config.timeout 
    });
  }

  /**
   * Go forward in browser history
   */
  public async goForward(): Promise<void> {
    await this.page.goForward({ 
      waitUntil: 'domcontentloaded',
      timeout: this.config.timeout 
    });
  }

  /**
   * Execute JavaScript in the page context
   */
  public async executeScript<T>(script: string, ...args: any[]): Promise<T> {
    return await this.page.evaluate(script, ...args);
  }

  /**
   * Execute JavaScript function in the page context
   */
  public async executeFunction<T>(fn: (...args: any[]) => T, ...args: any[]): Promise<T> {
    return await this.page.evaluate(fn, ...args);
  }

  /**
   * Clear browser storage
   */
  public async clearStorage(): Promise<void> {
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await this.page.context().clearCookies();
  }

  /**
   * Set viewport size
   */
  public async setViewportSize(width: number, height: number): Promise<void> {
    await this.page.setViewportSize({ width, height });
  }

  /**
   * Get viewport size
   */
  public async getViewportSize(): Promise<{ width: number; height: number }> {
    return this.page.viewportSize() || { width: 1280, height: 720 };
  }

  /**
   * Set extra HTTP headers
   */
  public async setExtraHTTPHeaders(headers: Record<string, string>): Promise<void> {
    await this.page.setExtraHTTPHeaders(headers);
  }

  /**
   * Get all locators for common elements that might exist on any page
   */
  protected getCommonLocators() {
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
  public async waitForLoadingToComplete(timeout?: number): Promise<void> {
    const { loadingSpinner } = this.getCommonLocators();
    try {
      await this.waitHelper.waitForElementToBeHidden(loadingSpinner, timeout);
    } catch (error) {
      // Loading spinner might not exist, which is fine
    }
  }

  /**
   * Close any open modals
   */
  public async closeModal(): Promise<void> {
    const { modal, closeButton } = this.getCommonLocators();
    
    if (await modal.isVisible()) {
      await this.actionHelper.clickLocator(closeButton);
      await this.waitHelper.waitForElementToBeHidden(modal);
    }
  }

  /**
   * Close any open overlays
   */
  public async closeOverlay(): Promise<void> {
    const { overlay } = this.getCommonLocators();
    
    if (await overlay.isVisible()) {
      await this.actionHelper.clickLocator(overlay);
      await this.waitHelper.waitForElementToBeHidden(overlay);
    }
  }

  /**
   * Wait for and dismiss notifications
   */
  public async dismissNotifications(): Promise<void> {
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
  public async getErrorMessage(): Promise<string | null> {
    const { errorMessage } = this.getCommonLocators();
    
    if (await errorMessage.isVisible()) {
      return await this.elementHelper.getTrimmedText(errorMessage);
    }
    return null;
  }

  /**
   * Get success message text if visible
   */
  public async getSuccessMessage(): Promise<string | null> {
    const { successMessage } = this.getCommonLocators();
    
    if (await successMessage.isVisible()) {
      return await this.elementHelper.getTrimmedText(successMessage);
    }
    return null;
  }

  /**
   * Check if page has any error messages
   */
  public async hasErrorMessage(): Promise<boolean> {
    const { errorMessage } = this.getCommonLocators();
    return await errorMessage.isVisible();
  }

  /**
   * Check if page has any success messages
   */
  public async hasSuccessMessage(): Promise<boolean> {
    const { successMessage } = this.getCommonLocators();
    return await successMessage.isVisible();
  }

  /**
   * Wait for page to be ready (DOM loaded, no loading spinners)
   */
  public async waitForPageReady(): Promise<void> {
    await this.waitForDOMContentLoaded();
    await this.waitForLoadingToComplete();
  }

  /**
   * Scroll to top of page
   */
  public async scrollToTop(): Promise<void> {
    await this.actionHelper.scrollToTop();
  }

  /**
   * Scroll to bottom of page
   */
  public async scrollToBottom(): Promise<void> {
    await this.actionHelper.scrollToBottom();
  }

  /**
   * Scroll element into view
   */
  public async scrollElementIntoView(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Highlight element for debugging
   */
  public async highlightElement(locator: Locator, color: string = 'red'): Promise<void> {
    await this.elementHelper.highlightElement(locator, color);
  }

  /**
   * Remove highlight from element
   */
  public async removeHighlight(locator: Locator): Promise<void> {
    await this.elementHelper.removeHighlight(locator);
  }

  /**
   * Wait for URL to change
   */
  public async waitForUrlChange(originalUrl?: string, timeout?: number): Promise<void> {
    const currentUrl = originalUrl || this.getCurrentUrl();
    await this.waitHelper.waitForUrlToChangeFrom(currentUrl, timeout);
  }

  /**
   * Wait for URL to contain specific text
   */
  public async waitForUrlToContain(text: string, timeout?: number): Promise<void> {
    await this.waitHelper.waitForUrlToMatch(new RegExp(text), timeout);
  }

  /**
   * Check if current URL contains specific text
   */
  public urlContains(text: string): boolean {
    return this.getCurrentUrl().includes(text);
  }

  /**
   * Check if current URL matches pattern
   */
  public urlMatches(pattern: RegExp): boolean {
    return pattern.test(this.getCurrentUrl());
  }

  /**
   * Get page performance metrics
   */
  public async getPerformanceMetrics(): Promise<any> {
    return await this.page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
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
  public updateConfig(updates: Partial<FrameworkConfig>): void {
    Object.assign(this.config, updates);
    this.actionHelper.updateConfig(updates);
    this.waitHelper.updateConfig(updates);
    this.assertionHelper.updateConfig(updates);
  }

  /**
   * Get current configuration
   */
  public getConfig(): Partial<FrameworkConfig> {
    return { ...this.config };
  }

  /**
   * Add custom CSS to page
   */
  public async addCustomCSS(css: string): Promise<void> {
    await this.page.addStyleTag({ content: css });
  }

  /**
   * Add custom JavaScript to page
   */
  public async addCustomJS(script: string): Promise<void> {
    await this.page.addScriptTag({ content: script });
  }

  /**
   * Wait for console message
   */
  public async waitForConsoleMessage(predicate?: (message: any) => boolean, timeout?: number): Promise<any> {
    return await this.waitHelper.waitForConsoleMessage(predicate, timeout);
  }

  /**
   * Get all console messages
   */
  public getConsoleMessages(): any[] {
    const messages: any[] = [];
    this.page.on('console', msg => messages.push(msg));
    return messages;
  }

  /**
   * Check if page is responsive (mobile-friendly)
   */
  public async checkResponsiveness(): Promise<{ mobile: boolean; tablet: boolean; desktop: boolean }> {
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