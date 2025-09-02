import { Page, expect } from '@playwright/test';
import { FrameworkConfig } from '../types';
import { ActionHelper } from '../helpers/ActionHelper';
import { WaitHelper } from '../helpers/WaitHelper';
import { AssertionHelper } from '../helpers/AssertionHelper';

/**
 * Base Steps Class
 * Provides common step definition patterns for test scenarios
 * Makes it easy for testers to create readable, reusable step definitions
 */
export abstract class BaseSteps {
  protected readonly page: Page;
  protected readonly actionHelper: ActionHelper;
  protected readonly waitHelper: WaitHelper;
  protected readonly assertionHelper: AssertionHelper;
  protected readonly config: Partial<FrameworkConfig>;

  constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
    this.page = page;
    this.config = {
      timeout: 30000,
      ...config
    };
    
    this.actionHelper = new ActionHelper(page, this.config);
    this.waitHelper = new WaitHelper(page, this.config);
    this.assertionHelper = new AssertionHelper(page, this.config);
  }

  /**
   * Common step: Navigate to a specific page
   * Usage: await this.navigateToPage('/login');
   */
  protected async navigateToPage(url: string): Promise<void> {
    await this.page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: this.config.timeout 
    });
    await this.waitHelper.waitForDOMContentLoaded();
  }

  /**
   * Common step: Fill a form field
   * Usage: await this.fillField('username', 'john@example.com');
   */
  protected async fillField(fieldName: string, value: string): Promise<void> {
    const selectors = [
      `[data-testid="${fieldName}"]`,
      `[name="${fieldName}"]`,
      `#${fieldName}`,
      `input[placeholder*="${fieldName}"]`,
      `label:has-text("${fieldName}") + input`
    ];

    for (const selector of selectors) {
      try {
        await this.actionHelper.fill(selector, value);
        return;
      } catch (error) {
        // Try next selector
      }
    }
    
    throw new Error(`Could not find field: ${fieldName}`);
  }

  /**
   * Common step: Click a button or link
   * Usage: await this.clickElement('Login');
   */
  protected async clickElement(elementText: string): Promise<void> {
    const selectors = [
      `[data-testid="${elementText.toLowerCase()}"]`,
      `button:has-text("${elementText}")`,
      `a:has-text("${elementText}")`,
      `[aria-label="${elementText}"]`,
      `[title="${elementText}"]`
    ];

    for (const selector of selectors) {
      try {
        await this.actionHelper.click(selector);
        return;
      } catch (error) {
        // Try next selector
      }
    }
    
    throw new Error(`Could not find element with text: ${elementText}`);
  }

  /**
   * Common step: Select from dropdown
   * Usage: await this.selectFromDropdown('Country', 'United Kingdom');
   */
  protected async selectFromDropdown(dropdownName: string, optionText: string): Promise<void> {
    const selectors = [
      `[data-testid="${dropdownName.toLowerCase()}"]`,
      `select[name="${dropdownName.toLowerCase()}"]`,
      `[aria-label="${dropdownName}"]`
    ];

    for (const selector of selectors) {
      try {
        await this.actionHelper.selectOptionFromDropdown(selector, optionText);
        return;
      } catch (error) {
        // Try next selector
      }
    }
    
    throw new Error(`Could not find dropdown: ${dropdownName}`);
  }

  /**
   * Common step: Check a checkbox
   * Usage: await this.checkCheckbox('I agree to terms');
   */
  protected async checkCheckbox(checkboxText: string): Promise<void> {
    const selectors = [
      `[data-testid="${checkboxText.toLowerCase().replace(/\s+/g, '-')}"]`,
      `input[type="checkbox"][name*="${checkboxText.toLowerCase()}"]`,
      `label:has-text("${checkboxText}") input[type="checkbox"]`
    ];

    for (const selector of selectors) {
      try {
        await this.actionHelper.checkCheckbox(selector);
        return;
      } catch (error) {
        // Try next selector
      }
    }
    
    throw new Error(`Could not find checkbox: ${checkboxText}`);
  }

  /**
   * Common step: Wait for element to be visible
   * Usage: await this.waitForElementToBeVisible('Welcome message');
   */
  protected async waitForElementToBeVisible(elementDescription: string, timeout?: number): Promise<void> {
    const selectors = [
      `[data-testid*="${elementDescription.toLowerCase().replace(/\s+/g, '-')}"]`,
      `:has-text("${elementDescription}")`,
      `[aria-label*="${elementDescription}"]`
    ];

    for (const selector of selectors) {
      try {
        await this.waitHelper.waitForVisible(selector, timeout);
        return;
      } catch (error) {
        // Try next selector
      }
    }
    
    throw new Error(`Element not visible: ${elementDescription}`);
  }

  /**
   * Common step: Verify text is present on page
   * Usage: await this.verifyTextIsPresent('Welcome back!');
   */
  protected async verifyTextIsPresent(expectedText: string): Promise<void> {
    const textLocator = this.page.getByText(expectedText);
    await this.assertionHelper.assertElementVisible(textLocator);
  }

  /**
   * Common step: Verify page title
   * Usage: await this.verifyPageTitle('Dashboard');
   */
  protected async verifyPageTitle(expectedTitle: string): Promise<void> {
    await this.assertionHelper.assertPageTitleContains(expectedTitle);
  }

  /**
   * Common step: Verify URL contains text
   * Usage: await this.verifyUrlContains('/dashboard');
   */
  protected async verifyUrlContains(expectedUrlPart: string): Promise<void> {
    await this.assertionHelper.assertPageURLContains(expectedUrlPart);
  }

  /**
   * Common step: Upload a file
   * Usage: await this.uploadFile('profile-picture', './test-data/avatar.jpg');
   */
  protected async uploadFile(fieldName: string, filePath: string): Promise<void> {
    const selectors = [
      `[data-testid="${fieldName}"]`,
      `input[type="file"][name="${fieldName}"]`,
      `input[type="file"][accept*="image"]`
    ];

    for (const selector of selectors) {
      try {
        await this.actionHelper.uploadFile(selector, filePath);
        return;
      } catch (error) {
        // Try next selector
      }
    }
    
    throw new Error(`Could not find file upload field: ${fieldName}`);
  }

  /**
   * Common step: Wait for loading to complete
   * Usage: await this.waitForLoadingToComplete();
   */
  protected async waitForLoadingToComplete(): Promise<void> {
    const loadingSelectors = [
      '.loading',
      '.spinner',
      '[data-testid*="loading"]',
      '[aria-label*="loading"]'
    ];

    for (const selector of loadingSelectors) {
      try {
        await this.waitHelper.waitForHidden(selector, 1000);
      } catch (error) {
        // Loading element might not exist, which is fine
      }
    }
  }

  /**
   * Common step: Take a screenshot for debugging
   * Usage: await this.takeScreenshot('after-login');
   */
  protected async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  /**
   * Common step: Scroll to element
   * Usage: await this.scrollToElement('Footer');
   */
  protected async scrollToElement(elementDescription: string): Promise<void> {
    const selectors = [
      `[data-testid*="${elementDescription.toLowerCase()}"]`,
      `:has-text("${elementDescription}")`,
      `[aria-label*="${elementDescription}"]`
    ];

    for (const selector of selectors) {
      try {
        await this.actionHelper.scrollIntoView(selector);
        return;
      } catch (error) {
        // Try next selector
      }
    }
    
    throw new Error(`Could not find element to scroll to: ${elementDescription}`);
  }

  /**
   * Common step: Switch to new tab/window
   * Usage: await this.switchToNewTab();
   */
  protected async switchToNewTab(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      // The action that opens the new tab should be called before this
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  /**
   * Common step: Close current tab and return to previous
   * Usage: await this.closeCurrentTab();
   */
  protected async closeCurrentTab(): Promise<void> {
    await this.page.close();
  }

  /**
   * Common step: Refresh the page
   * Usage: await this.refreshPage();
   */
  protected async refreshPage(): Promise<void> {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    await this.waitForLoadingToComplete();
  }

  /**
   * Common step: Clear a form field
   * Usage: await this.clearField('search');
   */
  protected async clearField(fieldName: string): Promise<void> {
    const selectors = [
      `[data-testid="${fieldName}"]`,
      `[name="${fieldName}"]`,
      `#${fieldName}`
    ];

    for (const selector of selectors) {
      try {
        await this.actionHelper.clear(selector);
        return;
      } catch (error) {
        // Try next selector
      }
    }
    
    throw new Error(`Could not find field to clear: ${fieldName}`);
  }

  /**
   * Common step: Hover over an element
   * Usage: await this.hoverOverElement('Menu item');
   */
  protected async hoverOverElement(elementDescription: string): Promise<void> {
    const selectors = [
      `[data-testid*="${elementDescription.toLowerCase().replace(/\s+/g, '-')}"]`,
      `:has-text("${elementDescription}")`,
      `[aria-label*="${elementDescription}"]`
    ];

    for (const selector of selectors) {
      try {
        await this.actionHelper.hover(selector);
        return;
      } catch (error) {
        // Try next selector
      }
    }
    
    throw new Error(`Could not find element to hover: ${elementDescription}`);
  }

  /**
   * Common step: Press a keyboard key
   * Usage: await this.pressKey('Enter');
   */
  protected async pressKey(key: string): Promise<void> {
    await this.actionHelper.pressKey(key);
  }

  /**
   * Common step: Get text from an element
   * Usage: const message = await this.getTextFromElement('Success message');
   */
  protected async getTextFromElement(elementDescription: string): Promise<string> {
    const selectors = [
      `[data-testid*="${elementDescription.toLowerCase().replace(/\s+/g, '-')}"]`,
      `:has-text("${elementDescription}")`,
      `[aria-label*="${elementDescription}"]`
    ];

    for (const selector of selectors) {
      try {
        return await this.actionHelper.getText(selector);
      } catch (error) {
        // Try next selector
      }
    }
    
    throw new Error(`Could not find element to get text from: ${elementDescription}`);
  }
}