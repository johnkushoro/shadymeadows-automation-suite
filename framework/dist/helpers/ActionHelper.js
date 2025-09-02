"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionHelper = void 0;
const LocatorHelper_1 = require("./LocatorHelper");
const WaitHelper_1 = require("./WaitHelper");
/**
 * Professional ActionHelper with comprehensive interaction methods
 * Self-contained with configurable options and no external dependencies
 */
class ActionHelper {
    constructor(page, config = {}) {
        this.page = page;
        this.config = {
            slowMo: 0,
            timeout: 30000,
            ...config
        };
        this.locatorHelper = new LocatorHelper_1.LocatorHelper(page);
        this.waitHelper = new WaitHelper_1.WaitHelper(page, this.config);
    }
    /**
     * Click on element by selector
     */
    async click(selector, options = {}) {
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
    async clickLocator(locator, options = {}) {
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
    async doubleClick(selector, options = {}) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator, options.timeout);
        await locator.dblclick({ force: options.force });
        await this.applySlowMo();
    }
    /**
     * Right click on element
     */
    async rightClick(selector, options = {}) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator, options.timeout);
        await locator.click({ button: 'right', force: options.force });
        await this.applySlowMo();
    }
    /**
     * Click link by text
     */
    async clickLinkByText(text, exact = true, options = {}) {
        const link = this.locatorHelper.getLinkByText(text, exact);
        await this.waitHelper.waitForElement(link, options.timeout);
        await link.click({ force: options.force });
        await this.applySlowMo();
    }
    /**
     * Click button by text
     */
    async clickButtonByText(text, exact = true, options = {}) {
        const button = this.locatorHelper.getButtonByText(text, exact);
        await this.waitHelper.waitForElement(button, options.timeout);
        await button.click({ force: options.force });
        await this.applySlowMo();
    }
    /**
     * Fill input field by selector
     */
    async fill(selector, value, options = {}) {
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
    async fillInputByLabel(label, value, exact = true, options = {}) {
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
    async fillInputByPlaceholder(placeholder, value, exact = true, options = {}) {
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
    async type(selector, text, options = {}) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator, options.timeout);
        await locator.type(text, { delay: options.delay || 50 });
        await this.applySlowMo();
    }
    /**
     * Clear input field
     */
    async clear(selector, options = {}) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator, options.timeout);
        await locator.clear();
        await this.applySlowMo();
    }
    /**
     * Press key
     */
    async pressKey(key) {
        await this.page.keyboard.press(key);
        await this.applySlowMo();
    }
    /**
     * Press key combination
     */
    async pressKeyCombo(keys) {
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
    async selectOptionFromDropdown(selector, label, options = {}) {
        const dropdown = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(dropdown, options.timeout);
        await dropdown.selectOption({ label });
        await this.applySlowMo();
    }
    /**
     * Select option from dropdown by value
     */
    async selectOptionByValue(selector, value, options = {}) {
        const dropdown = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(dropdown, options.timeout);
        await dropdown.selectOption({ value });
        await this.applySlowMo();
    }
    /**
     * Select option from dropdown by index
     */
    async selectOptionByIndex(selector, index, options = {}) {
        const dropdown = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(dropdown, options.timeout);
        await dropdown.selectOption({ index });
        await this.applySlowMo();
    }
    /**
     * Check checkbox
     */
    async checkCheckbox(selector, options = {}) {
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
    async uncheckCheckbox(selector, options = {}) {
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
    async toggleCheckbox(selector, options = {}) {
        const checkbox = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(checkbox, options.timeout);
        if (await checkbox.isChecked()) {
            await checkbox.uncheck({ force: options.force });
        }
        else {
            await checkbox.check({ force: options.force });
        }
        await this.applySlowMo();
    }
    /**
     * Select radio button by label
     */
    async selectRadioByLabel(labelText, exact = true, options = {}) {
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
    async selectRadioByValue(name, value, options = {}) {
        const radio = this.locatorHelper.getLocator(`input[name="${name}"][value="${value}"]`);
        await this.waitHelper.waitForElement(radio, options.timeout);
        await radio.check({ force: options.force });
        await this.applySlowMo();
    }
    /**
     * Select custom dropdown option
     */
    async selectCustomDropdown(selector, visibleText, exact = true, options = {}) {
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
    async hover(selector, options = {}) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator, options.timeout);
        await locator.hover();
        await this.applySlowMo();
    }
    /**
     * Scroll element into view
     */
    async scrollIntoView(selector) {
        const locator = this.locatorHelper.getLocator(selector);
        await locator.scrollIntoViewIfNeeded();
        await this.applySlowMo();
    }
    /**
     * Scroll to top of page
     */
    async scrollToTop() {
        await this.page.evaluate(() => window.scrollTo(0, 0));
        await this.applySlowMo();
    }
    /**
     * Scroll to bottom of page
     */
    async scrollToBottom() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.applySlowMo();
    }
    /**
     * Scroll by pixels
     */
    async scrollBy(x, y) {
        await this.page.evaluate(({ x, y }) => window.scrollBy(x, y), { x, y });
        await this.applySlowMo();
    }
    /**
     * Drag and drop
     */
    async dragAndDrop(sourceSelector, targetSelector, options = {}) {
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
    async uploadFile(selector, filePath, options = {}) {
        const fileInput = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(fileInput, options.timeout);
        await fileInput.setInputFiles(filePath);
        await this.applySlowMo();
    }
    /**
     * Focus on element
     */
    async focus(selector, options = {}) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator, options.timeout);
        await locator.focus();
        await this.applySlowMo();
    }
    /**
     * Blur (remove focus from) element
     */
    async blur(selector) {
        const locator = this.locatorHelper.getLocator(selector);
        await locator.blur();
        await this.applySlowMo();
    }
    /**
     * Get trimmed text content from locator
     */
    async getTrimmedText(locator) {
        return (await locator.textContent())?.trim() || '';
    }
    /**
     * Get text content from selector
     */
    async getText(selector, options = {}) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator, options.timeout);
        return await this.getTrimmedText(locator);
    }
    /**
     * Get attribute value
     */
    async getAttribute(selector, attribute, options = {}) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator, options.timeout);
        return await locator.getAttribute(attribute);
    }
    /**
     * Get input value
     */
    async getInputValue(selector, options = {}) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator, options.timeout);
        return await locator.inputValue();
    }
    /**
     * Check if element is visible
     */
    async isVisible(selector) {
        const locator = this.locatorHelper.getLocator(selector);
        return await locator.isVisible();
    }
    /**
     * Check if element is enabled
     */
    async isEnabled(selector) {
        const locator = this.locatorHelper.getLocator(selector);
        return await locator.isEnabled();
    }
    /**
     * Check if checkbox/radio is checked
     */
    async isChecked(selector) {
        const locator = this.locatorHelper.getLocator(selector);
        return await locator.isChecked();
    }
    /**
     * Get element count
     */
    async getElementCount(selector) {
        const locator = this.locatorHelper.getLocator(selector);
        return await locator.count();
    }
    /**
     * Click element by exact text
     */
    async clickElementByExactText(elements, targetText, options = {}) {
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
    async clickRowByMatchingText(rows, getTextFromRow, matchText, options = {}) {
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
    async clickCheckboxByText(...labelTexts) {
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
    async switchToTabByUrlPart(partialUrl) {
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
    async closeCurrentTab() {
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
    async acceptDialog() {
        this.page.once('dialog', async (dialog) => {
            await dialog.accept();
        });
    }
    /**
     * Dismiss browser dialog
     */
    async dismissDialog() {
        this.page.once('dialog', async (dialog) => {
            await dialog.dismiss();
        });
    }
    /**
     * Handle dialog with custom text
     */
    async handleDialog(text) {
        this.page.once('dialog', async (dialog) => {
            await dialog.accept(text);
        });
    }
    /**
     * Apply slow motion delay if configured
     */
    async applySlowMo() {
        const slowMo = this.config.slowMo || 0;
        if (slowMo > 0) {
            await this.page.waitForTimeout(slowMo);
        }
    }
    /**
     * Update configuration at runtime
     */
    updateConfig(updates) {
        Object.assign(this.config, updates);
        this.waitHelper.updateConfig(updates);
    }
}
exports.ActionHelper = ActionHelper;
//# sourceMappingURL=ActionHelper.js.map