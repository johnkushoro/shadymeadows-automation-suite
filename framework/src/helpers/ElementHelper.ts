import { Locator } from '@playwright/test';
import { ElementInfo, BoundingBox, Position, Size } from '../types';

/**
 * Professional ElementHelper with utility methods for element manipulation
 * Self-contained with comprehensive element operations and data extraction
 */
export class ElementHelper {
  
  /**
   * Get trimmed text content from locator
   */
  public static async getTrimmedText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() || '';
  }

  /**
   * Get lowercase text content from locator
   */
  public static async getLowerCasedText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim().toLowerCase() || '';
  }

  /**
   * Get uppercase text content from locator
   */
  public static async getUpperCasedText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim().toUpperCase() || '';
  }

  /**
   * Get attribute value from locator
   */
  public static async getAttribute(locator: Locator, attribute: string): Promise<string> {
    return (await locator.getAttribute(attribute)) || '';
  }

  /**
   * Get input value from locator
   */
  public static async getValue(locator: Locator): Promise<string> {
    return (await locator.inputValue())?.trim() || '';
  }

  /**
   * Get inner HTML from locator
   */
  public static async getInnerHTML(locator: Locator): Promise<string> {
    return (await locator.innerHTML()) || '';
  }

  /**
   * Get inner text from locator
   */
  public static async getInnerText(locator: Locator): Promise<string> {
    return (await locator.innerText())?.trim() || '';
  }

  /**
   * Get all text contents from multiple locators
   */
  public static async getAllTexts(locator: Locator): Promise<string[]> {
    const count = await locator.count();
    const texts: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const text = await this.getTrimmedText(locator.nth(i));
      texts.push(text);
    }
    
    return texts;
  }

  /**
   * Get all attribute values from multiple locators
   */
  public static async getAllAttributes(locator: Locator, attribute: string): Promise<string[]> {
    const count = await locator.count();
    const attributes: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const attr = await this.getAttribute(locator.nth(i), attribute);
      attributes.push(attr);
    }
    
    return attributes;
  }

  /**
   * Get all input values from multiple locators
   */
  public static async getAllValues(locator: Locator): Promise<string[]> {
    const count = await locator.count();
    const values: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const value = await this.getValue(locator.nth(i));
      values.push(value);
    }
    
    return values;
  }

  /**
   * Check if element has specific class
   */
  public static async hasClass(locator: Locator, className: string): Promise<boolean> {
    const classAttr = await this.getAttribute(locator, 'class');
    return classAttr.split(' ').includes(className);
  }

  /**
   * Check if element has any of the specified classes
   */
  public static async hasAnyClass(locator: Locator, classNames: string[]): Promise<boolean> {
    const classAttr = await this.getAttribute(locator, 'class');
    const elementClasses = classAttr.split(' ');
    return classNames.some(className => elementClasses.includes(className));
  }

  /**
   * Check if element has all specified classes
   */
  public static async hasAllClasses(locator: Locator, classNames: string[]): Promise<boolean> {
    const classAttr = await this.getAttribute(locator, 'class');
    const elementClasses = classAttr.split(' ');
    return classNames.every(className => elementClasses.includes(className));
  }

  /**
   * Get CSS property value
   */
  public static async getCSSProperty(locator: Locator, property: string): Promise<string> {
    return await locator.evaluate((el, prop) => {
      return window.getComputedStyle(el).getPropertyValue(prop);
    }, property);
  }

  /**
   * Get element's bounding box
   */
  public static async getBoundingBox(locator: Locator): Promise<BoundingBox | null> {
    const box = await locator.boundingBox();
    return box ? { x: box.x, y: box.y, width: box.width, height: box.height } : null;
  }

  /**
   * Get element's position
   */
  public static async getPosition(locator: Locator): Promise<Position> {
    const box = await this.getBoundingBox(locator);
    return box ? { x: box.x, y: box.y } : { x: 0, y: 0 };
  }

  /**
   * Get element's size
   */
  public static async getSize(locator: Locator): Promise<Size> {
    const box = await this.getBoundingBox(locator);
    return box ? { width: box.width, height: box.height } : { width: 0, height: 0 };
  }

  /**
   * Check if element is in viewport
   */
  public static async isInViewport(locator: Locator): Promise<boolean> {
    return await locator.isVisible() && await locator.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    });
  }

  /**
   * Get element's tag name
   */
  public static async getTagName(locator: Locator): Promise<string> {
    return await locator.evaluate(el => el.tagName.toLowerCase());
  }

  /**
   * Check if element is a specific tag
   */
  public static async isTag(locator: Locator, tagName: string): Promise<boolean> {
    const elementTag = await this.getTagName(locator);
    return elementTag === tagName.toLowerCase();
  }

  /**
   * Get element's ID
   */
  public static async getId(locator: Locator): Promise<string> {
    return await this.getAttribute(locator, 'id');
  }

  /**
   * Get element's name attribute
   */
  public static async getName(locator: Locator): Promise<string> {
    return await this.getAttribute(locator, 'name');
  }

  /**
   * Get element's data attribute
   */
  public static async getDataAttribute(locator: Locator, dataName: string): Promise<string> {
    return await this.getAttribute(locator, `data-${dataName}`);
  }

  /**
   * Get all data attributes
   */
  public static async getAllDataAttributes(locator: Locator): Promise<Record<string, string>> {
    return await locator.evaluate(el => {
      const data: Record<string, string> = {};
      for (let i = 0; i < el.attributes.length; i++) {
        const attr = el.attributes[i];
        if (attr.name.startsWith('data-')) {
          const key = attr.name.substring(5); // Remove 'data-' prefix
          data[key] = attr.value;
        }
      }
      return data;
    });
  }

  /**
   * Check if element has specific attribute
   */
  public static async hasAttribute(locator: Locator, attribute: string): Promise<boolean> {
    const value = await locator.getAttribute(attribute);
    return value !== null;
  }

  /**
   * Get element's role attribute
   */
  public static async getRole(locator: Locator): Promise<string> {
    return await this.getAttribute(locator, 'role');
  }

  /**
   * Get element's aria-label
   */
  public static async getAriaLabel(locator: Locator): Promise<string> {
    return await this.getAttribute(locator, 'aria-label');
  }

  /**
   * Get element's title attribute
   */
  public static async getTitle(locator: Locator): Promise<string> {
    return await this.getAttribute(locator, 'title');
  }

  /**
   * Get element's placeholder
   */
  public static async getPlaceholder(locator: Locator): Promise<string> {
    return await this.getAttribute(locator, 'placeholder');
  }

  /**
   * Check if element is required
   */
  public static async isRequired(locator: Locator): Promise<boolean> {
    return await this.hasAttribute(locator, 'required');
  }

  /**
   * Check if element is readonly
   */
  public static async isReadonly(locator: Locator): Promise<boolean> {
    return await this.hasAttribute(locator, 'readonly');
  }

  /**
   * Get element's type attribute (for inputs)
   */
  public static async getInputType(locator: Locator): Promise<string> {
    return await this.getAttribute(locator, 'type');
  }

  /**
   * Get element's href attribute (for links)
   */
  public static async getHref(locator: Locator): Promise<string> {
    return await this.getAttribute(locator, 'href');
  }

  /**
   * Get element's src attribute (for images/media)
   */
  public static async getSrc(locator: Locator): Promise<string> {
    return await this.getAttribute(locator, 'src');
  }

  /**
   * Get element's alt attribute (for images)
   */
  public static async getAlt(locator: Locator): Promise<string> {
    return await this.getAttribute(locator, 'alt');
  }

  /**
   * Get option text from select element
   */
  public static async getSelectedOptionText(locator: Locator): Promise<string> {
    return await locator.evaluate(el => {
      if (el instanceof HTMLSelectElement) {
        return el.options[el.selectedIndex]?.text || '';
      }
      return '';
    });
  }

  /**
   * Get all option texts from select element
   */
  public static async getAllOptionTexts(locator: Locator): Promise<string[]> {
    return await locator.evaluate(el => {
      if (el instanceof HTMLSelectElement) {
        return Array.from(el.options).map(option => option.text);
      }
      return [];
    });
  }

  /**
   * Get all option values from select element
   */
  public static async getAllOptionValues(locator: Locator): Promise<string[]> {
    return await locator.evaluate(el => {
      if (el instanceof HTMLSelectElement) {
        return Array.from(el.options).map(option => option.value);
      }
      return [];
    });
  }

  /**
   * Get comprehensive element information
   */
  public static async getElementInfo(locator: Locator): Promise<ElementInfo> {
    return {
      tagName: await this.getTagName(locator),
      id: await this.getId(locator),
      className: await this.getAttribute(locator, 'class'),
      text: await this.getTrimmedText(locator),
      value: await this.getValue(locator),
      isVisible: await locator.isVisible(),
      isEnabled: await locator.isEnabled(),
      isChecked: await locator.isChecked().catch(() => undefined)
    };
  }

  /**
   * Clean and normalize text (remove extra whitespace, normalize line breaks)
   */
  public static cleanText(text: string): string {
    return text
      .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
      .replace(/\n/g, ' ')  // Replace line breaks with space
      .trim();
  }

  /**
   * Extract numbers from text
   */
  public static extractNumbers(text: string): number[] {
    const matches = text.match(/\d+/g);
    return matches ? matches.map(Number) : [];
  }

  /**
   * Extract first number from text
   */
  public static extractFirstNumber(text: string): number | null {
    const numbers = this.extractNumbers(text);
    return numbers.length > 0 ? numbers[0] : null;
  }

  /**
   * Remove currency symbols and extract price
   */
  public static extractPrice(priceText: string): number {
    const cleanPrice = priceText.replace(/[^\d.]/g, '');
    return parseFloat(cleanPrice) || 0;
  }

  /**
   * Format text for comparison (lowercase, trim, remove special chars)
   */
  public static normalizeForComparison(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, '') // Remove special characters
      .replace(/\s+/g, ' ');   // Normalize whitespace
  }

  /**
   * Check if two texts are similar (ignoring case, whitespace, special chars)
   */
  public static areTextsSimilar(text1: string, text2: string): boolean {
    return this.normalizeForComparison(text1) === this.normalizeForComparison(text2);
  }

  /**
   * Get element screenshot as buffer
   */
  public static async getElementScreenshot(locator: Locator): Promise<Buffer> {
    return await locator.screenshot();
  }

  /**
   * Highlight element (for debugging)
   */
  public static async highlightElement(locator: Locator, color: string = 'red'): Promise<void> {
    await locator.evaluate((el, color) => {
      el.style.border = `3px solid ${color}`;
      el.style.backgroundColor = `${color}33`; // Semi-transparent
    }, color);
  }

  /**
   * Remove highlight from element
   */
  public static async removeHighlight(locator: Locator): Promise<void> {
    await locator.evaluate(el => {
      el.style.border = '';
      el.style.backgroundColor = '';
    });
  }

  /**
   * Scroll element to center of viewport
   */
  public static async scrollToCenter(locator: Locator): Promise<void> {
    await locator.evaluate(el => {
      el.scrollIntoView({ block: 'center', inline: 'center' });
    });
  }

  /**
   * Get element's computed styles
   */
  public static async getComputedStyles(locator: Locator): Promise<CSSStyleDeclaration> {
    return await locator.evaluate(el => {
      return window.getComputedStyle(el);
    });
  }

  /**
   * Check if element is clickable (visible, enabled, and not covered)
   */
  public static async isClickable(locator: Locator): Promise<boolean> {
    const isVisible = await locator.isVisible();
    const isEnabled = await locator.isEnabled();
    
    if (!isVisible || !isEnabled) {
      return false;
    }

    // Check if element is not covered by another element
    const isNotCovered = await locator.evaluate(el => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const elementAtPoint = document.elementFromPoint(centerX, centerY);
      return el === elementAtPoint || el.contains(elementAtPoint);
    });

    return isNotCovered;
  }

  /**
   * Get element's parent element
   */
  public static async getParentElement(locator: Locator): Promise<Locator> {
    return locator.locator('..');
  }

  /**
   * Get element's children count
   */
  public static async getChildrenCount(locator: Locator): Promise<number> {
    return await locator.evaluate(el => el.children.length);
  }

  /**
   * Check if element has children
   */
  public static async hasChildren(locator: Locator): Promise<boolean> {
    return (await this.getChildrenCount(locator)) > 0;
  }

  /**
   * Get element's text length
   */
  public static async getTextLength(locator: Locator): Promise<number> {
    const text = await this.getTrimmedText(locator);
    return text.length;
  }

  /**
   * Check if element text is empty
   */
  public static async isTextEmpty(locator: Locator): Promise<boolean> {
    return (await this.getTextLength(locator)) === 0;
  }

  /**
   * Get element's opacity
   */
  public static async getOpacity(locator: Locator): Promise<number> {
    const opacity = await this.getCSSProperty(locator, 'opacity');
    return parseFloat(opacity) || 1;
  }

  /**
   * Check if element is transparent
   */
  public static async isTransparent(locator: Locator): Promise<boolean> {
    return (await this.getOpacity(locator)) === 0;
  }

  /**
   * Get element's z-index
   */
  public static async getZIndex(locator: Locator): Promise<number> {
    const zIndex = await this.getCSSProperty(locator, 'z-index');
    return parseInt(zIndex) || 0;
  }

  /**
   * Wait for element to have specific text
   */
  public static async waitForText(locator: Locator, expectedText: string, timeout: number = 30000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      const currentText = await this.getTrimmedText(locator);
      if (currentText === expectedText) {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    throw new Error(`Element did not have expected text "${expectedText}" within ${timeout}ms`);
  }

  /**
   * Wait for element to contain specific text
   */
  public static async waitForTextToContain(locator: Locator, expectedText: string, timeout: number = 30000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      const currentText = await this.getTrimmedText(locator);
      if (currentText.includes(expectedText)) {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    throw new Error(`Element did not contain expected text "${expectedText}" within ${timeout}ms`);
  }
}