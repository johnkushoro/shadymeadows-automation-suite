import { expect, Locator, Page } from '@playwright/test';
import { FrameworkConfig } from '../types';

/**
 * Professional AssertionHelper with comprehensive assertion methods
 * Self-contained with configurable options and no external dependencies
 */
export class AssertionHelper {
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
   * Assert element has exact text
   */
  public async assertElementHasText(locator: Locator, expectedText: string, timeout?: number): Promise<void> {
    await expect(locator).toHaveText(expectedText, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element contains text
   */
  public async assertElementContainsText(locator: Locator, expectedText: string, timeout?: number): Promise<void> {
    await expect(locator).toContainText(expectedText, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element is visible
   */
  public async assertElementVisible(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeVisible({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element is hidden
   */
  public async assertElementHidden(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeHidden({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element is enabled
   */
  public async assertElementEnabled(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeEnabled({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element is disabled
   */
  public async assertElementDisabled(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeDisabled({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element is checked (for checkboxes/radio buttons)
   */
  public async assertElementChecked(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeChecked({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element is unchecked
   */
  public async assertElementUnchecked(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).not.toBeChecked({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element has specific attribute value
   */
  public async assertElementHasAttribute(
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
   * Assert element has specific class
   */
  public async assertElementHasClass(locator: Locator, className: string, timeout?: number): Promise<void> {
    await expect(locator).toHaveClass(new RegExp(className), { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element has specific CSS property value
   */
  public async assertElementHasCSS(
    locator: Locator, 
    property: string, 
    value: string, 
    timeout?: number
  ): Promise<void> {
    await expect(locator).toHaveCSS(property, value, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert input has specific value
   */
  public async assertInputHasValue(locator: Locator, value: string, timeout?: number): Promise<void> {
    await expect(locator).toHaveValue(value, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element count
   */
  public async assertElementCount(locator: Locator, count: number, timeout?: number): Promise<void> {
    await expect(locator).toHaveCount(count, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert page title
   */
  public async assertPageTitle(expectedTitle: string, timeout?: number): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert page title contains text
   */
  public async assertPageTitleContains(partialTitle: string, timeout?: number): Promise<void> {
    await expect(this.page).toHaveTitle(new RegExp(partialTitle), { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert page URL
   */
  public async assertPageURL(expectedUrl: string, timeout?: number): Promise<void> {
    await expect(this.page).toHaveURL(expectedUrl, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert page URL contains text
   */
  public async assertPageURLContains(partialUrl: string, timeout?: number): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(partialUrl), { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element is attached to DOM
   */
  public async assertElementAttached(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeAttached({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element is detached from DOM
   */
  public async assertElementDetached(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).not.toBeAttached({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element is editable
   */
  public async assertElementEditable(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeEditable({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element is not editable
   */
  public async assertElementNotEditable(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).not.toBeEditable({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element is empty
   */
  public async assertElementEmpty(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeEmpty({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element is not empty
   */
  public async assertElementNotEmpty(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).not.toBeEmpty({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element is focused
   */
  public async assertElementFocused(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeFocused({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element is not focused
   */
  public async assertElementNotFocused(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).not.toBeFocused({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element visible with optional text (combined assertion)
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
   * Assert multiple elements are visible
   */
  public async assertMultipleElementsVisible(locators: Locator[], timeout?: number): Promise<void> {
    for (const locator of locators) {
      await expect(locator).toBeVisible({ 
        timeout: timeout || this.config.timeout
      });
    }
  }

  /**
   * Assert multiple elements are hidden
   */
  public async assertMultipleElementsHidden(locators: Locator[], timeout?: number): Promise<void> {
    for (const locator of locators) {
      await expect(locator).toBeHidden({ 
        timeout: timeout || this.config.timeout
      });
    }
  }

  /**
   * Assert text matches regex pattern
   */
  public async assertTextMatchesPattern(locator: Locator, pattern: RegExp, timeout?: number): Promise<void> {
    await expect(locator).toHaveText(pattern, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element has specific ID
   */
  public async assertElementHasId(locator: Locator, id: string, timeout?: number): Promise<void> {
    await expect(locator).toHaveAttribute('id', id, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert dropdown has specific selected option
   */
  public async assertDropdownHasSelectedOption(locator: Locator, optionText: string, timeout?: number): Promise<void> {
    await expect(locator).toHaveValue(optionText, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element has specific data attribute
   */
  public async assertElementHasDataAttribute(
    locator: Locator, 
    dataAttribute: string, 
    value: string, 
    timeout?: number
  ): Promise<void> {
    await expect(locator).toHaveAttribute(`data-${dataAttribute}`, value, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element has specific role
   */
  public async assertElementHasRole(locator: Locator, role: string, timeout?: number): Promise<void> {
    await expect(locator).toHaveAttribute('role', role, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element has specific aria-label
   */
  public async assertElementHasAriaLabel(locator: Locator, label: string, timeout?: number): Promise<void> {
    await expect(locator).toHaveAttribute('aria-label', label, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element is within viewport
   */
  public async assertElementInViewport(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeInViewport({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element is not in viewport
   */
  public async assertElementNotInViewport(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).not.toBeInViewport({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert screenshot matches baseline
   */
  public async assertScreenshotMatches(locator: Locator, name: string, screenshotOptions?: any): Promise<void> {
    await expect(locator).toHaveScreenshot(name, screenshotOptions);
  }

  /**
   * Assert page screenshot matches baseline
   */
  public async assertPageScreenshotMatches(name: string, screenshotOptions?: any): Promise<void> {
    await expect(this.page).toHaveScreenshot(name, screenshotOptions);
  }

  /**
   * Assert element has specific placeholder
   */
  public async assertElementHasPlaceholder(locator: Locator, placeholder: string, timeout?: number): Promise<void> {
    await expect(locator).toHaveAttribute('placeholder', placeholder, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element has specific title
   */
  public async assertElementHasTitle(locator: Locator, title: string, timeout?: number): Promise<void> {
    await expect(locator).toHaveAttribute('title', title, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element has specific href
   */
  public async assertElementHasHref(locator: Locator, href: string, timeout?: number): Promise<void> {
    await expect(locator).toHaveAttribute('href', href, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element has specific src
   */
  public async assertElementHasSrc(locator: Locator, src: string, timeout?: number): Promise<void> {
    await expect(locator).toHaveAttribute('src', src, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element has specific alt text
   */
  public async assertElementHasAlt(locator: Locator, alt: string, timeout?: number): Promise<void> {
    await expect(locator).toHaveAttribute('alt', alt, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element count is greater than
   */
  public async assertElementCountGreaterThan(locator: Locator, count: number): Promise<void> {
    const actualCount = await locator.count();
    expect(actualCount).toBeGreaterThan(count);
  }

  /**
   * Assert element count is less than
   */
  public async assertElementCountLessThan(locator: Locator, count: number): Promise<void> {
    const actualCount = await locator.count();
    expect(actualCount).toBeLessThan(count);
  }

  /**
   * Assert element count is between range
   */
  public async assertElementCountBetween(locator: Locator, min: number, max: number): Promise<void> {
    const actualCount = await locator.count();
    expect(actualCount).toBeGreaterThanOrEqual(min);
    expect(actualCount).toBeLessThanOrEqual(max);
  }

  /**
   * Custom assertion with retry logic
   */
  public async assertWithRetry(
    assertion: () => Promise<void>,
    maxRetries: number = 3,
    retryDelay: number = 1000
  ): Promise<void> {
    let lastError: Error | null = null;
    
    for (let i = 0; i <= maxRetries; i++) {
      try {
        await assertion();
        return; // Success, exit the function
      } catch (error) {
        lastError = error as Error;
        if (i < maxRetries) {
          await this.page.waitForTimeout(retryDelay);
        }
      }
    }
    
    throw lastError; // Throw the last error if all retries failed
  }

  /**
   * Soft assertion (doesn't stop test execution on failure)
   */
  public async softAssertElementVisible(locator: Locator, timeout?: number): Promise<void> {
    await expect.soft(locator).toBeVisible({ 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Soft assertion for text content
   */
  public async softAssertElementHasText(locator: Locator, expectedText: string, timeout?: number): Promise<void> {
    await expect.soft(locator).toHaveText(expectedText, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element has specific value (for inputs)
   */
  public async assertElementHasValue(locator: Locator, value: string, timeout?: number): Promise<void> {
    await expect(locator).toHaveValue(value, { 
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Assert element contains specific value (partial match)
   */
  public async assertElementContainsValue(locator: Locator, value: string, timeout?: number): Promise<void> {
    const actualValue = await locator.inputValue();
    expect(actualValue).toContain(value);
  }

  /**
   * Assert element has specific inner text
   */
  public async assertElementHasInnerText(locator: Locator, text: string, timeout?: number): Promise<void> {
    await expect(locator).toHaveText(text, { 
      timeout: timeout || this.config.timeout,
      useInnerText: true
    });
  }

  /**
   * Assert element is clickable (visible and enabled)
   */
  public async assertElementClickable(locator: Locator, timeout?: number): Promise<void> {
    await this.assertElementVisible(locator, timeout);
    await this.assertElementEnabled(locator, timeout);
  }

  /**
   * Assert element has specific tag name
   */
  public async assertElementHasTagName(locator: Locator, tagName: string): Promise<void> {
    const actualTagName = await locator.evaluate(el => el.tagName.toLowerCase());
    expect(actualTagName).toBe(tagName.toLowerCase());
  }

  /**
   * Assert element has specific computed style
   */
  public async assertElementHasComputedStyle(locator: Locator, property: string, value: string): Promise<void> {
    const computedValue = await locator.evaluate((el, prop) => {
      return window.getComputedStyle(el).getPropertyValue(prop);
    }, property);
    expect(computedValue).toBe(value);
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