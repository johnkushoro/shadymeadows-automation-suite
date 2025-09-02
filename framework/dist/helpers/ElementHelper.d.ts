import { Locator } from '@playwright/test';
import { ElementInfo, BoundingBox, Position, Size } from '../types';
/**
 * Professional ElementHelper with utility methods for element manipulation
 * Self-contained with comprehensive element operations and data extraction
 */
export declare class ElementHelper {
    /**
     * Get trimmed text content from locator
     */
    static getTrimmedText(locator: Locator): Promise<string>;
    /**
     * Get lowercase text content from locator
     */
    static getLowerCasedText(locator: Locator): Promise<string>;
    /**
     * Get uppercase text content from locator
     */
    static getUpperCasedText(locator: Locator): Promise<string>;
    /**
     * Get attribute value from locator
     */
    static getAttribute(locator: Locator, attribute: string): Promise<string>;
    /**
     * Get input value from locator
     */
    static getValue(locator: Locator): Promise<string>;
    /**
     * Get inner HTML from locator
     */
    static getInnerHTML(locator: Locator): Promise<string>;
    /**
     * Get inner text from locator
     */
    static getInnerText(locator: Locator): Promise<string>;
    /**
     * Get all text contents from multiple locators
     */
    static getAllTexts(locator: Locator): Promise<string[]>;
    /**
     * Get all attribute values from multiple locators
     */
    static getAllAttributes(locator: Locator, attribute: string): Promise<string[]>;
    /**
     * Get all input values from multiple locators
     */
    static getAllValues(locator: Locator): Promise<string[]>;
    /**
     * Check if element has specific class
     */
    static hasClass(locator: Locator, className: string): Promise<boolean>;
    /**
     * Check if element has any of the specified classes
     */
    static hasAnyClass(locator: Locator, classNames: string[]): Promise<boolean>;
    /**
     * Check if element has all specified classes
     */
    static hasAllClasses(locator: Locator, classNames: string[]): Promise<boolean>;
    /**
     * Get CSS property value
     */
    static getCSSProperty(locator: Locator, property: string): Promise<string>;
    /**
     * Get element's bounding box
     */
    static getBoundingBox(locator: Locator): Promise<BoundingBox | null>;
    /**
     * Get element's position
     */
    static getPosition(locator: Locator): Promise<Position>;
    /**
     * Get element's size
     */
    static getSize(locator: Locator): Promise<Size>;
    /**
     * Check if element is in viewport
     */
    static isInViewport(locator: Locator): Promise<boolean>;
    /**
     * Get element's tag name
     */
    static getTagName(locator: Locator): Promise<string>;
    /**
     * Check if element is a specific tag
     */
    static isTag(locator: Locator, tagName: string): Promise<boolean>;
    /**
     * Get element's ID
     */
    static getId(locator: Locator): Promise<string>;
    /**
     * Get element's name attribute
     */
    static getName(locator: Locator): Promise<string>;
    /**
     * Get element's data attribute
     */
    static getDataAttribute(locator: Locator, dataName: string): Promise<string>;
    /**
     * Get all data attributes
     */
    static getAllDataAttributes(locator: Locator): Promise<Record<string, string>>;
    /**
     * Check if element has specific attribute
     */
    static hasAttribute(locator: Locator, attribute: string): Promise<boolean>;
    /**
     * Get element's role attribute
     */
    static getRole(locator: Locator): Promise<string>;
    /**
     * Get element's aria-label
     */
    static getAriaLabel(locator: Locator): Promise<string>;
    /**
     * Get element's title attribute
     */
    static getTitle(locator: Locator): Promise<string>;
    /**
     * Get element's placeholder
     */
    static getPlaceholder(locator: Locator): Promise<string>;
    /**
     * Check if element is required
     */
    static isRequired(locator: Locator): Promise<boolean>;
    /**
     * Check if element is readonly
     */
    static isReadonly(locator: Locator): Promise<boolean>;
    /**
     * Get element's type attribute (for inputs)
     */
    static getInputType(locator: Locator): Promise<string>;
    /**
     * Get element's href attribute (for links)
     */
    static getHref(locator: Locator): Promise<string>;
    /**
     * Get element's src attribute (for images/media)
     */
    static getSrc(locator: Locator): Promise<string>;
    /**
     * Get element's alt attribute (for images)
     */
    static getAlt(locator: Locator): Promise<string>;
    /**
     * Get option text from select element
     */
    static getSelectedOptionText(locator: Locator): Promise<string>;
    /**
     * Get all option texts from select element
     */
    static getAllOptionTexts(locator: Locator): Promise<string[]>;
    /**
     * Get all option values from select element
     */
    static getAllOptionValues(locator: Locator): Promise<string[]>;
    /**
     * Get comprehensive element information
     */
    static getElementInfo(locator: Locator): Promise<ElementInfo>;
    /**
     * Clean and normalize text (remove extra whitespace, normalize line breaks)
     */
    static cleanText(text: string): string;
    /**
     * Extract numbers from text
     */
    static extractNumbers(text: string): number[];
    /**
     * Extract first number from text
     */
    static extractFirstNumber(text: string): number | null;
    /**
     * Remove currency symbols and extract price
     */
    static extractPrice(priceText: string): number;
    /**
     * Format text for comparison (lowercase, trim, remove special chars)
     */
    static normalizeForComparison(text: string): string;
    /**
     * Check if two texts are similar (ignoring case, whitespace, special chars)
     */
    static areTextsSimilar(text1: string, text2: string): boolean;
    /**
     * Get element screenshot as buffer
     */
    static getElementScreenshot(locator: Locator): Promise<Buffer>;
    /**
     * Highlight element (for debugging)
     */
    static highlightElement(locator: Locator, color?: string): Promise<void>;
    /**
     * Remove highlight from element
     */
    static removeHighlight(locator: Locator): Promise<void>;
    /**
     * Scroll element to center of viewport
     */
    static scrollToCenter(locator: Locator): Promise<void>;
    /**
     * Get element's computed styles
     */
    static getComputedStyles(locator: Locator): Promise<CSSStyleDeclaration>;
    /**
     * Check if element is clickable (visible, enabled, and not covered)
     */
    static isClickable(locator: Locator): Promise<boolean>;
    /**
     * Get element's parent element
     */
    static getParentElement(locator: Locator): Promise<Locator>;
    /**
     * Get element's children count
     */
    static getChildrenCount(locator: Locator): Promise<number>;
    /**
     * Check if element has children
     */
    static hasChildren(locator: Locator): Promise<boolean>;
    /**
     * Get element's text length
     */
    static getTextLength(locator: Locator): Promise<number>;
    /**
     * Check if element text is empty
     */
    static isTextEmpty(locator: Locator): Promise<boolean>;
    /**
     * Get element's opacity
     */
    static getOpacity(locator: Locator): Promise<number>;
    /**
     * Check if element is transparent
     */
    static isTransparent(locator: Locator): Promise<boolean>;
    /**
     * Get element's z-index
     */
    static getZIndex(locator: Locator): Promise<number>;
    /**
     * Wait for element to have specific text
     */
    static waitForText(locator: Locator, expectedText: string, timeout?: number): Promise<void>;
    /**
     * Wait for element to contain specific text
     */
    static waitForTextToContain(locator: Locator, expectedText: string, timeout?: number): Promise<void>;
}
//# sourceMappingURL=ElementHelper.d.ts.map