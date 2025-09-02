import { expect, Locator, Page } from '@playwright/test';
import { LocatorHelper } from './LocatorHelper';
import { WaitHelper } from './WaitHelper';
import { ActionOptions, ClickOptions, TypeOptions, SelectOptions, FrameworkConfig } from '../types';

/**
 * Professional ActionHelper with comprehensive interaction methods
 * Self-contained with configurable options and no external dependencies
 */
export class ActionHelper {
  private locatorHelper: LocatorHelper;
  private waitHelper: WaitHelper;
  private readonly config: Partial<FrameworkConfig>;

  constructor(
    private page: Page, 
    config: Partial<FrameworkConfig> = {}
  ) {
    this.config = {
      slowMo: 0,
      timeout: 30000,
      ...config
    };
    this.locatorHelper = new LocatorHelper(page);
    this.waitHelper = new WaitHelper(page, this.config);
  }

  /**
   * Click on element by selector
   */
  public async click(selector: string, options: ClickOptions = {}): Promise<void> {
    const locator = this.locatorHelper.getLocator(selector);
    await this.waitHelper.waitForElement(locator, options.timeout);
    await locator.click({ 
      force: options.force,
      button: options.button,
      clickCount: options.clickCount,
      delay: options.delay
    });
    await this.applySlowMo();
  }

  /**
   * Click on locator
   */
  public async clickLocator(locator: Locator, options: ClickOptions = {}): Promise<void> {
    await this.waitHelper.waitForElement(locator, options.timeout);
    await locator.click({ 
      force: options.force,
      button: options.button,
      clickCount: options.clickCount,
      delay: options.delay
    });
    await this.applySlowMo();
  }

  /**
   * Double click on element
   */
  public async doubleClick(selector: string, options: ClickOptions = {}): Promise<void> {
    const locator = this.locatorHelper.getLocator(selector);
    await this.waitHelper.waitForElement(locator, options.timeout);
    await locator.dblclick({ force: options.force });
    await this.applySlowMo();
  }

  /**
   * Right click on element
   */
  public async rightClick(selector: string, options: ClickOptions = {}): Promise<void> {
    const locator = this.locatorHelper.getLocator(selector);
    await this.waitHelper.waitForElement(locator, options.timeout);
    await locator.click({ button: 'right', force: options.force });
    await this.applySlowMo();
  }

  /**
   * Click link by text
   */
  public async clickLinkByText(text: string, exact: boolean = true, options: ClickOptions = {}): Promise<void> {
    const link = this.locatorHelper.getLinkByText(text, exact);
    await this.waitHelper.waitForElement(link, options.timeout);
    await link.click({ force: options.force });
    await this.applySlowMo();
  }

  /**
   * Click button by text
   */
  public async clickButtonByText(text: string, exact: boolean = true, options: ClickOptions = {}): Promise<void> {
    const button = this.locatorHelper.getButtonByText(text, exact);
    await this.waitHelper.waitForElement(button, options.timeout);
    await button.click({ force: options.force });
    await this.applySlowMo();
  }

  /**
   * Fill input field by selector
   */
  public async fill(selector: string, value: string, options: ActionOptions = {}): Promise<void> {
    const locator = this.locatorHelper.getLocator(selector);
    await this.waitHelper.waitForElement(locator, options.timeout);
    
    if (options.clear) {
      await locator.clear();
    }
    
    await locator.fill(value);
    await this.applySlowMo();
  }

  /**
   * Fill input by label
   */
  public async fillInputByLabel(label: string, value: string, exact: boolean = true, options: ActionOptions = {}): Promise<void> {
    const input = this.locatorHelper.getInputByLabel(label, exact);
    await input.scrollIntoViewIfNeeded();
    await this.waitHelper.waitForElement(input, options.timeout);
    
    if (options.clear) {
      await input.clear();
    }
    
    await input.fill(value);
    await this.applySlowMo();
  }

  /**
   * Fill input by placeholder
   */
  public async fillInputByPlaceholder(placeholder: string, value: string, exact: boolean = true, options: ActionOptions = {}): Promise<void> {
    const input = this.locatorHelper.getInputByPlaceholder(placeholder, exact);
    await this.waitHelper.waitForElement(input, options.timeout);
    
    if (options.clear) {
      await input.clear();
    }
    
    await input.fill(value);
    await this.applySlowMo();
  }

  /**
   * Type text with delay between keystrokes
   */
  public async type(selector: string, text: string, options: TypeOptions = {}): Promise<void> {
    const locator = this.locatorHelper.getLocator(selector);
    await this.waitHelper.waitForElement(locator, options.timeout);
    await locator.type(text, { delay: options.delay || 50 });
    await this.applySlowMo();
  }

  /**
   * Clear input field
   */
  public async clear(selector: string, options: ActionOptions = {}): Promise<void> {
    const locator = this.locatorHelper.getLocator(selector);
    await this.waitHelper.waitForElement(locator, options.timeout);
    await locator.clear();
    await this.applySlowMo();
  }

  /**
   * Press key
   */
  public async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
    await this.applySlowMo();
  }

  /**
   * Press key combination
   */
  public async pressKeyCombo(keys: string[]): Promise<void> {
    for (const key of keys) {
      await this.page.keyboard.down(key);
    }
    for (const key of keys.reverse()) {
      await this.page.keyboard.up(key);
    }
    await this.applySlowMo();
  }

  /**
   * Select option from dropdown by label
   */
  public async selectOptionFromDropdown(selector: string, label: string, options: SelectOptions = {}): Promise<void> {
    const dropdown = this.locatorHelper.getLocator(selector);
    await this.waitHelper.waitForElement(dropdown, options.timeout);
    await dropdown.selectOption({ label });
    await this.applySlowMo();
  }

  /**
   * Select option from dropdown by value
   */
  public async selectOptionByValue(selector: string, value: string, options: SelectOptions = {}): Promise<void> {
    const dropdown = this.locatorHelper.getLocator(selector);
    await this.waitHelper.waitForElement(dropdown, options.timeout);
    await dropdown.selectOption({ value });
    await this.applySlowMo();
  }

  /**
   * Select option from dropdown by index
   */
  public async selectOptionByIndex(selector: string, index: number, options: SelectOptions = {}): Promise<void> {
    const dropdown = this.locatorHelper.getLocator(selector);
    await this.waitHelper.waitForElement(dropdown, options.timeout);
    await dropdown.selectOption({ index });
    await this.applySlowMo();
  }

  /**
   * Check checkbox
   */
  public async checkCheckbox(selector: string, options: ActionOptions = {}): Promise<void> {
    const checkbox = this.locatorHelper.getLocator(selector);
    await this.waitHelper.waitForElement(checkbox, options.timeout);
    
    if (!(await checkbox.isChecked())) {
      await checkbox.check({ force: options.force });
    }
    await this.applySlowMo();
  }

  /**
   * Uncheck checkbox
   */
  public async uncheckCheckbox(selector: string, options: ActionOptions = {}): Promise<void> {
    const checkbox = this.locatorHelper.getLocator(selector);
    await this.waitHelper.waitForElement(checkbox, options.timeout);
    
    if (await checkbox.isChecked()) {
      await checkbox.uncheck({ force: options.force });
    }
    await this.applySlowMo();
  }

  /**
   * Toggle checkbox
   */
  public async toggleCheckbox(selector: string, options: ActionOptions = {}): Promise<void> {
    const checkbox = this.locatorHelper.getLocator(selector);
    await this.waitHelper.waitForElement(checkbox, options.timeout);
    
    if (await checkbox.isChecked()) {
      await checkbox.uncheck({ force: options.force });
    } else {
      await checkbox.check({ force: options.force });
    }
    await this.applySlowMo();
  }

  /**
   * Select radio button by label
   */
  public async selectRadioByLabel(labelText: string, exact: boolean = true, options: ActionOptions = {}): Promise<void> {
    const radio = this.locatorHelper.getInputByLabel(labelText, exact);
    await this.waitHelper.waitForElement(radio, options.timeout);
    
    if (!(await radio.isChecked())) {
      await radio.check({ force: options.force });
    }
    await this.applySlowMo();
  }

  /**
   * Select radio button by value
   */
  public async selectRadioByValue(name: string, value: string, options: ActionOptions = {}): Promise<void> {
    const radio = this.locatorHelper.getLocator(`input[name="${name}"][value="${value}"]`);
    await this.waitHelper.waitForElement(radio, options.timeout);
    await radio.check({ force: options.force });
    await this.applySlowMo();
  }

  /**
   * Select custom dropdown option
   */
  public async selectCustomDropdown(selector: string, visibleText: string, exact: boolean = true, options: SelectOptions = {}): Promise<void> {
    const dropdown = this.locatorHelper.getLocator(selector);
    await this.waitHelper.waitForElement(dropdown, options.timeout);
    await dropdown.click();

    const option = this.locatorHelper.getByText(visibleText, exact);
    await this.waitHelper.waitForElement(option, options.timeout);
    await option.click();
    await this.applySlowMo();
  }

  /**
   * Hover over element
   */
  public async hover(selector: string, options: ActionOptions = {}): Promise<void> {
    const locator = this.locatorHelper.getLocator(selector);
    await this.waitHelper.waitForElement(locator, options.timeout);
    await locator.hover();
    await this.applySlowMo();
  }

  /**
   * Scroll element into view
   */
  public async scrollIntoView(selector: string): Promise<void> {
    const locator = this.locatorHelper.getLocator(selector);
    await locator.scrollIntoViewIfNeeded();
    await this.applySlowMo();
  }

  /**
   * Scroll to top of page
   */
  public async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.applySlowMo();
  }

  /**
   * Scroll to bottom of page
   */
  public async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.applySlowMo();
  }

  /**
   * Scroll by pixels
   */
  public async scrollBy(x: number, y: number): Promise<void> {
    await this.page.evaluate(({ x, y }) => window.scrollBy(x, y), { x, y });
    await this.applySlowMo();
  }

  /**
   * Drag and drop
   */
  public async dragAndDrop(sourceSelector: string, targetSelector: string, options: ActionOptions = {}): Promise<void> {
    const source = this.locatorHelper.getLocator(sourceSelector);
    const target = this.locatorHelper.getLocator(targetSelector);
    
    await this.waitHelper.waitForElement(source, options.timeout);
    await this.waitHelper.waitForElement(target, options.timeout);
    
    await source.dragTo(target);
    await this.applySlowMo();
  }

  /**
   * Upload file
   */
  public async uploadFile(selector: string, filePath: string | string[], options: ActionOptions = {}): Promise<void> {
    const fileInput = this.locatorHelper.getLocator(selector);
    await this.waitHelper.waitForElement(fileInput, options.timeout);
    await fileInput.setInputFiles(filePath);
    await this.applySlowMo();
  }

  /**
   * Focus on element
   */
  public async focus(selector: string, options: ActionOptions = {}): Promise<void> {
    const locator = this.locatorHelper.getLocator(selector);
    await this.waitHelper.waitForElement(locator, options.timeout);
    await locator.focus();
    await this.applySlowMo();
  }

  /**
   * Blur (remove focus from) element
   */
  public async blur(selector: string): Promise<void> {
    const locator = this.locatorHelper.getLocator(selector);
    await locator.blur();
    await this.applySlowMo();
  }

  /**
   * Get trimmed text content from locator
   */
  public async getTrimmedText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() || '';
  }

  /**
   * Get text content from selector
   */
  public async getText(selector: string, options: ActionOptions = {}): Promise<string> {
    const locator = this.locatorHelper.getLocator(selector);
    await this.waitHelper.waitForElement(locator, options.timeout);
    return await this.getTrimmedText(locator);
  }

  /**
   * Get attribute value
   */
  public async getAttribute(selector: string, attribute: string, options: ActionOptions = {}): Promise<string | null> {
    const locator = this.locatorHelper.getLocator(selector);
    await this.waitHelper.waitForElement(locator, options.timeout);
    return await locator.getAttribute(attribute);
  }

  /**
   * Get input value
   */
  public async getInputValue(selector: string, options: ActionOptions = {}): Promise<string> {
    const locator = this.locatorHelper.getLocator(selector);
    await this.waitHelper.waitForElement(locator, options.timeout);
    return await locator.inputValue();
  }

  /**
   * Check if element is visible
   */
  public async isVisible(selector: string): Promise<boolean> {
    const locator = this.locatorHelper.getLocator(selector);
    return await locator.isVisible();
  }

  /**
   * Check if element is enabled
   */
  public async isEnabled(selector: string): Promise<boolean> {
    const locator = this.locatorHelper.getLocator(selector);
    return await locator.isEnabled();
  }

  /**
   * Check if checkbox/radio is checked
   */
  public async isChecked(selector: string): Promise<boolean> {
    const locator = this.locatorHelper.getLocator(selector);
    return await locator.isChecked();
  }

  /**
   * Get element count
   */
  public async getElementCount(selector: string): Promise<number> {
    const locator = this.locatorHelper.getLocator(selector);
    return await locator.count();
  }

  /**
   * Click element by exact text
   */
  public async clickElementByExactText(elements: Locator, targetText: string, options: ClickOptions = {}): Promise<void> {
    const count = await elements.count();

    for (let i = 0; i < count; i++) {
      const element = elements.nth(i);
      const text = (await element.innerText()).trim();

      if (text === targetText) {
        await this.waitHelper.waitForElement(element, options.timeout);
        await element.click({ force: options.force });
        await this.applySlowMo();
        return;
      }

      if (text.startsWith(targetText)) {
        await this.waitHelper.waitForElement(element, options.timeout);
        await element.click({ force: options.force });
        await this.applySlowMo();
        return;
      }
    }

    throw new Error(`Element with text "${targetText}" not found (even with fuzzy matching).`);
  }

  /**
   * Click row by matching text
   */
  public async clickRowByMatchingText(
    rows: Locator,
    getTextFromRow: (row: Locator) => Promise<string>,
    matchText: string,
    options: ClickOptions = {}
  ): Promise<void> {
    const count = await rows.count();

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const text = await getTextFromRow(row);

      if (text.trim() === matchText.trim()) {
        await row.click({ force: options.force });
        await this.applySlowMo();
        return;
      }
    }

    throw new Error(`Row with text "${matchText}" not found.`);
  }

  /**
   * Click multiple checkboxes by label text
   */
  public async clickCheckboxByText(...labelTexts: string[]): Promise<void> {
    if (labelTexts.length === 0 || labelTexts.length > 6) {
      throw new Error('You must provide between 1 and 6 checkbox labels.');
    }

    for (const labelText of labelTexts) {
      const checkbox = this.locatorHelper.getInputByLabel(labelText, true);
      await this.waitHelper.waitForElement(checkbox);
      
      if (!(await checkbox.isChecked())) {
        await checkbox.check({ force: true });
      }
      await this.applySlowMo();
    }
  }

  /**
   * Switch to tab by URL part
   */
  public async switchToTabByUrlPart(partialUrl: string): Promise<Page | null> {
    const pages = this.page.context().pages();
    for (const p of pages) {
      if (p.url().includes(partialUrl)) {
        await p.bringToFront();
        return p;
      }
    }
    return null;
  }

  /**
   * Close current tab and switch to previous
   */
  public async closeCurrentTab(): Promise<Page | null> {
    const pages = this.page.context().pages();
    if (pages.length > 1) {
      await this.page.close();
      return pages[pages.length - 2]; // Return previous page
    }
    return null;
  }

  /**
   * Accept browser dialog (alert, confirm, prompt)
   */
  public async acceptDialog(): Promise<void> {
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
  }

  /**
   * Dismiss browser dialog
   */
  public async dismissDialog(): Promise<void> {
    this.page.once('dialog', async dialog => {
      await dialog.dismiss();
    });
  }

  /**
   * Handle dialog with custom text
   */
  public async handleDialog(text: string): Promise<void> {
    this.page.once('dialog', async dialog => {
      await dialog.accept(text);
    });
  }

  /**
   * Apply slow motion delay if configured
   */
  private async applySlowMo(): Promise<void> {
    const slowMo = this.config.slowMo || 0;
    if (slowMo > 0) {
      await this.page.waitForTimeout(slowMo);
    }
  }

  /**
   * Update configuration at runtime
   */
  public updateConfig(updates: Partial<FrameworkConfig>): void {
    Object.assign(this.config, updates);
    this.waitHelper.updateConfig(updates);
  }
}