import { expect, Locator, Page, Response } from '@playwright/test';
import { FrameworkConfig, WaitOptions, AssertionOptions } from '../types';

/**
 * Professional WaitHelper with comprehensive waiting strategies
 * Self-contained with configurable options and no external dependencies
 */
export class WaitHelper {
  private readonly config: Partial<FrameworkConfig>;

  constructor(
    private page: Page, 
    config: Partial<FrameworkConfig> = {}
  ) {
    this.config = {
      timeout: 30000,
      ...config
    };
  }

  /**
   * Wait for element to be visible
   */
  public async waitForElement(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ 
      state: 'visible', 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Wait for element to be hidden
   */
  public async waitForElementToBeHidden(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ 
      state: 'hidden', 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Wait for element to be attached to DOM
   */
  public async waitForElementToBeAttached(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ 
      state: 'attached', 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Wait for element to be detached from DOM
   */
  public async waitForElementToBeDetached(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ 
      state: 'detached', 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Wait for selector to be visible
   */
  public async waitForVisible(selector: string, timeout?: number): Promise<void> {
    await this.page.waitForSelector(selector, {
      state: 'visible',
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * Wait for selector to be hidden
   */
  public async waitForHidden(selector: string, timeout?: number): Promise<void> {
    await this.page.waitForSelector(selector, {
      state: 'hidden',
      timeout: timeout || this.config.timeout,
    });
  }

  /**
   * Wait for custom function to return truthy value
   */
  public async waitForFunction(
    fn: (arg: any) => unknown,
    arg: any,
    timeout?: number
  ): Promise<void> {
    await this.page.waitForFunction(fn, arg, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Wait for locator to have specific count
   */
  public async waitForLocatorToHaveCount(
    locator: Locator, 
    expectedCount: number, 
    timeout?: number
  ): Promise<void> {
    await expect(locator).toHaveCount(expectedCount, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Wait for locator to be hidden (alias for consistency)
   */
  public async waitForLocatorToBeHidden(locator: Locator, timeout?: number): Promise<void> {
    await this.waitForElementToBeHidden(locator, timeout);
  }

  /**
   * Wait for locator to be detached (alias for consistency)
   */
  public async waitForLocatorToBeDetached(locator: Locator, timeout?: number): Promise<void> {
    await this.waitForElementToBeDetached(locator, timeout);
  }

  /**
   * Wait for new tab/page to open
   */
  public async waitForNewTab(clickAction: () => Promise<void>): Promise<Page> {
    const [newTab] = await Promise.all([
      this.page.context().waitForEvent('page'),
      clickAction(),
    ]);
    await newTab.waitForLoadState('domcontentloaded');
    return newTab;
  }

  /**
   * Wait for page to load completely
   */
  public async waitForPageLoad(
    url?: string,
    waitUntil: 'load' | 'domcontentloaded' | 'networkidle' = 'load'
  ): Promise<Response | null> {
    if (url) {
      return this.page.goto(url, { waitUntil });
    } else {
      await this.page.waitForLoadState(waitUntil);
      return null;
    }
  }

  /**
   * Wait for network to be idle
   */
  public async waitForNetworkIdle(timeout?: number): Promise<void> {
    await this.page.waitForLoadState('networkidle', { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Wait for DOM content to be loaded
   */
  public async waitForDOMContentLoaded(timeout?: number): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded', { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Wait for page title to contain specific text
   */
  public async waitForTitleToContain(partialTitle: string, timeout?: number): Promise<void> {
    await expect(this.page).toHaveTitle(new RegExp(partialTitle), { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Wait for URL to change from original
   */
  public async waitForUrlToChangeFrom(
    originalUrl: string,
    timeout?: number
  ): Promise<void> {
    await this.page.waitForURL(
      (url) => url.toString() !== originalUrl,
      { timeout: timeout || this.config.timeout }
    );
  }

  /**
   * Wait for URL to match pattern
   */
  public async waitForUrlToMatch(
    urlPattern: string | RegExp,
    timeout?: number
  ): Promise<void> {
    await this.page.waitForURL(urlPattern, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Wait for element to disappear (alias for hidden)
   */
  public async waitForElementToDisappear(locator: Locator, timeout?: number): Promise<void> {
    await this.waitForElementToBeHidden(locator, timeout);
  }

  /**
   * Wait for element to have specific text
   */
  public async waitForElementToHaveText(
    locator: Locator, 
    expectedText: string, 
    timeout?: number
  ): Promise<void> {
    await expect(locator).toHaveText(expectedText, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Wait for element to contain specific text
   */
  public async waitForElementToContainText(
    locator: Locator, 
    expectedText: string, 
    timeout?: number
  ): Promise<void> {
    await expect(locator).toContainText(expectedText, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Wait for element to have specific attribute value
   */
  public async waitForElementToHaveAttribute(
    locator: Locator, 
    attribute: string, 
    value: string, 
    timeout?: number
  ): Promise<void> {
    await expect(locator).toHaveAttribute(attribute, value, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Wait for element to be enabled
   */
  public async waitForElementToBeEnabled(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeEnabled({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Wait for element to be disabled
   */
  public async waitForElementToBeDisabled(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeDisabled({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Wait for element to be checked (for checkboxes/radio buttons)
   */
  public async waitForElementToBeChecked(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeChecked({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Wait for element to be unchecked
   */
  public async waitForElementToBeUnchecked(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).not.toBeChecked({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Wait for specific timeout (use sparingly)
   */
  public async waitForTimeout(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }

  /**
   * Wait for request to complete
   */
  public async waitForRequest(urlPattern: string | RegExp, timeout?: number): Promise<void> {
    await this.page.waitForRequest(urlPattern, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Wait for response to complete
   */
  public async waitForResponse(urlPattern: string | RegExp, timeout?: number): Promise<Response> {
    return await this.page.waitForResponse(urlPattern, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Wait for console message
   */
  public async waitForConsoleMessage(
    predicate?: (message: any) => boolean,
    timeout?: number
  ): Promise<any> {
    return await this.page.waitForEvent('console', { 
      predicate,
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Wait for download to start
   */
  public async waitForDownload(clickAction: () => Promise<void>): Promise<any> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      clickAction(),
    ]);
    return download;
  }

  /**
   * Verify page title contains text (combines wait and assertion)
   */
  public async verifyPageTitleContains(partialTitle: string, timeout?: number): Promise<void> {
    await this.waitForTitleToContain(partialTitle, timeout);
  }

  /**
   * Assert element visible with optional text (combines wait and assertion)
   */
  public async assertElementVisibleWithOptionalText(
    locator: Locator, 
    expectedText?: string,
    timeout?: number
  ): Promise<void> {
    await expect(locator).toBeVisible({ 
      timeout: timeout || this.config.timeout
    });
    if (expectedText) {
      await expect(locator).toHaveText(expectedText, { 
        timeout: timeout || this.config.timeout
      });
    }
  }

  /**
   * Wait for multiple conditions to be met
   */
  public async waitForMultipleConditions(
    conditions: (() => Promise<void>)[],
    timeout?: number
  ): Promise<void> {
    const promises = conditions.map(condition => condition());
    await Promise.all(promises);
  }

  /**
   * Wait for any of multiple conditions to be met
   */
  public async waitForAnyCondition(
    conditions: (() => Promise<void>)[],
    timeout?: number
  ): Promise<void> {
    const promises = conditions.map(condition => condition());
    await Promise.race(promises);
  }

  /**
   * Wait with retry logic
   */
  public async waitWithRetry(
    condition: () => Promise<boolean>,
    maxRetries: number = 3,
    retryDelay: number = 1000,
    timeout?: number
  ): Promise<void> {
    let lastError: Error | null = null;
    
    for (let i = 0; i <= maxRetries; i++) {
      try {
        const result = await condition();
        if (result) {
          return;
        }
        throw new Error('Condition not met');
      } catch (error) {
        lastError = error as Error;
        if (i < maxRetries) {
          await this.waitForTimeout(retryDelay);
        }
      }
    }
    
    throw lastError || new Error('Wait condition failed after retries');
  }

  /**
   * Update configuration at runtime
   */
  public updateConfig(updates: Partial<FrameworkConfig>): void {
    Object.assign(this.config, updates);
  }

  /**
   * Get current timeout setting
   */
  public getTimeout(): number {
    return this.config.timeout || 30000;
  }
}